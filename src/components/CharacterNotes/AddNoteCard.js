// Packages
import { useState, useContext } from 'react'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { updateDocument } from '../../helpers/firestore'

const AddNoteCard = (props) => {
    const { notes, setNotes, id, isCharacterNotes } = props
    const setNotification = useContext(NotificationContext)[1]
    const [newName, setNewName] = useState("")

    return (
        <Card className="w-112 h-112">
            <CardTitle>
                Add New Note
            </CardTitle>
            <div className="flex flex-col mx-auto my-auto">
                <lable className="font-semibold text-lg">Name: </lable>
                <input
                    className="border rounded px-2 py-1"
                    placeholder="Name for new card"
                    value={newName}
                    onChange={(event) => {setNewName(event.target.value)}}
                />
                <button 
                    className="bg-green-500 text-white px-2 py-1 my-2 w-fit mx-auto rounded"
                    onClick={() => {
                        let tempNotes = [...notes]
                        tempNotes.push({
                            0: {
                                name: newName, tags: [], locked: false,
                                affiliations: [], status: "", position: ""
                            }
                        })
                        setNotes(tempNotes)
                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                    }}
                >Add Card</button>
            </div>
        </Card>
	)
}

export default AddNoteCard
