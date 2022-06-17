// Packages
import { useState, useContext } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { generateStatusClasses } from '../../helpers/characternotes'
import { updateDocument } from '../../helpers/firestore'

const BasicInfo = (props) => {
    const { 
        isAdmin, name, position, status, 
        setNotes, index, notes, isCharacterNotes, id
    } = props
    const [nameValue, setNameValue] = useState("")
    const [positionValue, setPositionValue] = useState("")
    const [statusValue, setStatusValue] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <div>
            <h4 className="text-xl font-semibold">Basic Info</h4>
            <ConditionalRender 
                condition={isAdmin}
                returnComponent={
                    <div className="mt-1 mb-4">
                        <ConditionalRender condition={name || name === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Name:</h5><p>{name}</p>
                            </div>
                        </ConditionalRender>
                        <ConditionalRender condition={position || position === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Position:</h5><p>{position}</p>
                            </div>
                        </ConditionalRender>
                        <ConditionalRender condition={status || status === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Status:</h5>
                                <p className={"px-2 rounded " + generateStatusClasses(status)}>{status}</p>
                            </div>
                        </ConditionalRender>
                    </div>
                }
            >
                <div className="mt-1 mb-4">
                    <div className="flex mx-2 gap-2 my-1">
                        <h5 className="font-semibold my-auto">Name:</h5>
                        <input
                            className="border rounded px-2 py-1"
                            placeholder={name ? name : "Character Name"}
                            value={nameValue}
                            onChange={(event) => {
                                setNameValue(event.target.value)
                            }}
                        />
                    </div>
                    <div className="flex mx-2 gap-2 my-1">
                        <h5 className="font-semibold my-auto">Position:</h5>
                        <input
                            className="border rounded px-2 py-1"
                            placeholder={position ? position : "Character Position"}
                            value={positionValue}
                            onChange={(event) => {
                                setPositionValue(event.target.value)
                            }}
                        />
                    </div>
                    <div className="flex mx-2 gap-2 my-1">
                        <h5 className="font-semibold my-auto">Status:</h5>
                        <input
                            className={"border rounded px-2 py-1 text-white placeholder:text-white " + generateStatusClasses(statusValue === "" ? status : statusValue)}
                            placeholder={status ? status : "Character Status"}
                            value={statusValue}
                            onChange={(event) => {
                                setStatusValue(event.target.value)
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <button 
                            className="bg-green-500 text-white rounded px-2 py-1"
                            onClick={() => {
                                let tempNotes = [...notes]
                                tempNotes[index][0] = {
                                    ...tempNotes[index][0], 
                                    name: nameValue === "" ? (name ? name : "" ) : nameValue, 
                                    position: positionValue === "" ? (position ? position : "" ) : positionValue, 
                                    status: statusValue === "" ? (status ? status : "" ) : statusValue
                                }
                                setNameValue("")
                                setPositionValue("")
                                setStatusValue("")
                                setNotes(tempNotes)
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            }}
                        >Update</button>
                    </div>
                </div>
            </ConditionalRender>
        </div>
	)
}

export default BasicInfo
