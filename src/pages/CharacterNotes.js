// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
import { NoteCard, AddNoteCard } from '../components/CharacterNotes'
// UI
import Container from "../ui/Container"
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'

const CharacterNote = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [isCharacterNotes, setIsCharacterNotes] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        if (isLoading) {
            getDocument("characternotes", id, setNotification).then((data) => {
                setNotes(data.data().characters)
                getCurrentUser(setUID, (uid) => {
                    if (data.data().admins.includes(uid)) {
                        setIsAdmin(true)
                    }
                })
                setIsCharacterNotes(data.exists())
                setIsLoading(false)
            })
        }
    }, [id, isLoading, uid, setNotification])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="w-screen flex-1 flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                {
                    notes.map((note, i) => {
                        return (
                            <NoteCard 
                                key={i} setNotes={setNotes} index={i}
                                character={note} isAdmin={isAdmin} notes={notes}
                                isCharacterNotes={isCharacterNotes} id={id}
                            />
                        )
                    })
                }
                <ConditionalRender condition={isAdmin}>
                    <AddNoteCard />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default CharacterNote
