// Packages
import { useEffect, useState, useContext, Fragment } from 'react'
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
    const [searchQuerry, setSearchQuerry] = useState("")

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
            <div className="flex flex-col mx-auto my-2 text-2xl">
                <label className="text-xs">Search</label>
                <input
                    className=" border rounded w-72 h-10 px-1"
                    placeholder="Type to Search"
                    value={searchQuerry}
                    onChange={(event) => {setSearchQuerry(event.target.value)}}
                />
            </div>
            <Container className="w-screen flex-1 flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                {
                    notes.map((note, i) => {
                        if (
                            note[0].name.toLowerCase().includes(searchQuerry.toLowerCase()) ||
                            note[0].position.toLowerCase().includes(searchQuerry.toLowerCase()) ||
                            note[0].status.toLowerCase().includes(searchQuerry.toLowerCase())
                        ) {
                            return (
                                <NoteCard 
                                    key={i} setNotes={setNotes} index={i}
                                    character={note} isAdmin={isAdmin} notes={notes}
                                    isCharacterNotes={isCharacterNotes} id={id}
                                />
                            )
                        } else {
                            return <Fragment key={i}></Fragment>
                        }
                    })
                }
                <ConditionalRender condition={isAdmin}>
                    <AddNoteCard
                        notes={notes} setNotes={setNotes} 
                        id={id} isCharacterNotes={isCharacterNotes}
                    />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default CharacterNote
