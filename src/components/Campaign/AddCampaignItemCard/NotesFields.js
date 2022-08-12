// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// Campaign
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocumentWithPromise } from '../../../helpers/firestore'
import { getCurrentUser } from '../../../helpers/auth'
// Objects
import { CHARACTERNNOTES } from '../../../helpers/emptycampaignitems'

const NotesFields = (props) => {
    const { id } = props
    const [name, setName] = useState("")
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
            <div className="py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        const noteID = uuidv4()
                        let newNote = CHARACTERNNOTES
                        newNote.name = name
                        newNote.admins = [userID]
                        getDocument("campaigns", id, setNotification).then((data) => {
                            const campaignData = data.data()
                            let campaign = {...campaignData}
                            campaign.characternotes = [...campaignData.characternotes, noteID]
                            updateDocumentWithPromise("characternotes", noteID, newNote, setNotification).then(() => {
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

export default NotesFields
