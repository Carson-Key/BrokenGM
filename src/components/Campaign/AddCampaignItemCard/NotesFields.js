// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from '../../../helpers/firestore'
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
            <Name name={name} setName={setName}/>
            <div className="mx-2 py-4 flex justify-center">
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
                            updateDocument("characternotes", noteID, newNote, setNotification)
                            updateDocument("campaigns", id, campaign, setNotification)
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
