// Packages
import { GrAddCircle } from 'react-icons/gr'
import { useState, useContext } from 'react'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { addCharacterRelation } from '../../helpers/relation'

const AddCharacterRelation = (props) => {
    const { id, index, setRelations, relations, isRelation } = props
    const [nameToAdd, setNameToAdd] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <div className="w-full">
            <div className="py-2 text-2xl mx-auto w-fit h-fit">
                <input 
                    className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-40 inline"
                    type="text" 
                    value={nameToAdd}
                    name="Add Character"
                    placeholder="John Doe"
                    onChange={(event) => {
                        setNameToAdd(event.target.value)
                    }}
                />
                <button
                    onClick={
                        () => {
                            addCharacterRelation(
                                nameToAdd, index, 
                                relations, setRelations, 
                                setNotification, id, isRelation, setNameToAdd
                            )
                        }
                    }
                >
                    <GrAddCircle className="inline h-9 mx-1 mb-1" />
                </button>
            </div>
        </div>
    )
}

export default AddCharacterRelation
