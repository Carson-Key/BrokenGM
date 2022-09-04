// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// Campaign
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
import DefaultVoters from '../VotingSystemSettings/DefaultVoters'
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocumentWithPromise } from '../../../helpers/firestore'
import { getCurrentUser } from '../../../helpers/auth'
import { updateRealtimeDB } from '../../../helpers/database'
// Objects
import { VOTINGSYSTEMSFIRESTORE, VOTINGSYSTEMSREALTIME } from '../../../helpers/emptycampaignitems'

const VotingsystemsFields = (props) => {
    const { id } = props
    const [name, setName] = useState("")
    const [userID, setUserID] = useState("")
    const [defaultVotersObject, setDefaultVotersObject] = useState({})
    const [defaultVoters, setDefaultVoters] = useState([])
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        getCurrentUser(setUserID)
    }, [userID])
    useEffect(() => {
        setDefaultVoters(Object.keys(defaultVotersObject))
    }, [defaultVotersObject])

    return (
        <>
            <SettingsSection>
                <SettingsSectionTitle>Name</SettingsSectionTitle>
                <Name name={name} setName={setName}/>
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Default Voters</SettingsSectionTitle>
                <DefaultVoters
                    defaultVoters={defaultVoters} setDefaultVoters={setDefaultVoters}
                    defaultVotersObject={defaultVotersObject} setDefaultVotersObject={setDefaultVotersObject} 
                    afterAddFunc={() => {}} afterRemoveFunc={() => {}}
                />
            </SettingsSection>
            <div className="py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        const votingsystemID = uuidv4()
                        let newVotingSystems = {...VOTINGSYSTEMSFIRESTORE}
                        let newVotingSystemsRTDB = {...VOTINGSYSTEMSREALTIME}
                        newVotingSystems.name = name
                        newVotingSystems.admins = [userID]
                        newVotingSystems["realtime-id"] = votingsystemID
                        newVotingSystemsRTDB.defaultVoters = defaultVotersObject
                        newVotingSystemsRTDB.admins = {[userID]: true}
                        getDocument("campaigns", id, setNotification).then((data) => {
                            const campaignData = data.data()
                            let campaign = {...campaignData}
                            campaign.votingsystems = [...campaignData.votingsystems, votingsystemID]
                            updateDocumentWithPromise("votingsystems", votingsystemID, newVotingSystems, setNotification).then(() => {
                                updateDocumentWithPromise("campaigns", id, campaign, setNotification).then(() => {
                                    updateRealtimeDB(
                                        newVotingSystemsRTDB, 
                                        ["votingsystems/" + votingsystemID + "/"]
                                    ).then(() => {
                                        window.location.reload(false)
                                    })
                                })
                            })
                        })
                    }}
                >
                    Add
                </button>
            </div>
        </>
    )
}

export default VotingsystemsFields
