// Packages
import { useState, useContext } from "react"
import { GrAddCircle } from 'react-icons/gr'
import { FaTrash } from "react-icons/fa"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { fireError } from "../../../helpers/notifications"
import { formatCharacterName, reverseFormatCharacterName } from "../../../helpers/relation"

const Characters = (props) => {
    const { 
        characters, setCharacters, afterAddFunc, afterRemoveFunc
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [newCharacter, setNewCharacter] = useState("")

    return (
        <div className="ml-2">
            <div className="flex flex-wrap">
                {
                    Object.keys(characters).map((character, i) => {
                        return (
                            <div key={i} className={
                                    "w-1/2 py-2 px-2 flex justify-between" +
                                    ((i < characters.length - ((characters.length % 2 !== 0) ? 1 : 2)) ? " border-b" : "") +
                                    (((i % 2 === 0) && (characters.length > 1)) ? " border-r" : "")
                                }
                            >
                                {formatCharacterName(character)}
                                <button className="text-red-500"
                                    onClick={() => {
                                        let tempCharacters = {...characters}
                                        delete tempCharacters[character]
                                        setCharacters(tempCharacters)
                                        afterRemoveFunc()
                                    }}
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2 mx-auto w-fit h-fit">
                <input 
                    className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-32 inline"
                    type="text"
                    name="Add Character"
                    placeholder="Name of Character"
                    value={newCharacter}
                    onChange={(event) => {
                        setNewCharacter(event.target.value)
                    }}
                />
                <button
                    onClick={
                        () => {
                            if (newCharacter !== "") {
                                setNewCharacter("")
                                setCharacters({...characters, [reverseFormatCharacterName(newCharacter)]: 0})
                                afterAddFunc()
                            } else {
                                fireError(setNotification, 1, "Please fill the character field before adding a new entry")
                            }
                        }
                    }
                >
                    <GrAddCircle className="inline h-9 mx-1 mb-1" />
                </button>
            </div>
        </div>
    )
}

export default Characters
