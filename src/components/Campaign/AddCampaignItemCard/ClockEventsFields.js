// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// Campaign
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
import AssociatedClock from '../ClockEventsSettings/AssociatedClock'
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocumentWithPromise } from '../../../helpers/firestore'
import { getCurrentUser } from '../../../helpers/auth'
// Objects
import { CLOCKEVENTS } from '../../../helpers/emptycampaignitems'

const ClockEventsFields = (props) => {
    const { id, clocks } = props
    const [name, setName] = useState("")
    const [currentClock, setCurrentClock] = useState(clocks[0] ? clocks[0] : "")
    const [userID, setUserID] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        getCurrentUser(setUserID)
    }, [userID])

    return (
        <>
            <SettingsSection>
                <SettingsSectionTitle>Name</SettingsSectionTitle>
                <Name name={name} setName={setName}/>
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Associated Clock</SettingsSectionTitle>
                <AssociatedClock 
                    clocks={clocks}
                    selectEvent={() => {}}
                    currentClock={currentClock}
                    setCurrentClock={setCurrentClock}
                />
            </SettingsSection>
            <div className="py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        const eventsID = uuidv4()
                        let newEvents = CLOCKEVENTS
                        newEvents.name = name
                        newEvents.admins = [userID]
                        newEvents.clock = currentClock
                        getDocument("campaigns", id, setNotification).then((data) => {
                            const campaignData = data.data()
                            let campaign = {...campaignData}
                            campaign.clockevents = [...campaignData.clockevents, eventsID]
                            updateDocumentWithPromise("clockevents", eventsID, newEvents, setNotification).then(() => {
                                updateDocumentWithPromise("campaigns", id, campaign, setNotification).then(() => {
                                    window.location.reload(false)
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

export default ClockEventsFields
