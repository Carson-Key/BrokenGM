// Packages
import { useState, useContext } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// UI
import ConfirmationPopUp from '../../ui/ConfirmationPopUp'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'

const Footer = (props) => {
    const { 
        setCardExpandedClass, isAdmin, setNotes, notes, 
        id, index, isCharacterNotes, setCharacterElements 
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [expandCard, setExpandCard] = useState(true)
    const [newItem, setNewItem] = useState("")
    const [popUp, setPopUp] = useState(false)
    const [newType, setNewType] = useState(false)
    const defaultObjects = useState({
        list: {
            type: "list",
            list: [],
            name: "List"
        },
        block: {
            type: "block",
            content: "",
            name: "Block"
        },
        namedlist: {
            type: "namedlist",
            list: [],
            name: "Named List"
        }
    })[0]

    return (
        <div className={"border-t-2 border-secondary mt-auto flex " + (isAdmin ? "justify-between" : "justify-end")}>
            <ConditionalRender condition={isAdmin}>
                <div className="mx-1 my-1">
                    <h6>Add:</h6>
                    <button 
                        className="mr-1 border rounded px-2 bg-green-300 text-white"
                        onClick={() => {
                            setPopUp(true)
                            setNewType("list")
                        }}
                    >List</button>
                    <button 
                        className="mr-1 border rounded px-2 bg-green-300 text-white"
                        onClick={() => {
                            setPopUp(true)
                            setNewType("namedlist")
                        }}
                    >Named List</button>
                    <button 
                        className="mr-1 border rounded px-2 bg-green-300 text-white"
                        onClick={() => {
                            setPopUp(true)
                            setNewType("block")
                        }}
                    >Text Block</button>
                </div>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2 mx-4" 
                onClick={() => {
                    setExpandCard(prev => !prev)
                    setCardExpandedClass(
                        prev => (
                        (prev === " h-112") ? 
                            " h-160 md:h-168 md:w-162" : 
                            " h-112"
                        )
                    )
                }
            }>{moreLessTextDecider(!expandCard)}</button>
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message={<>
                        Add a {(defaultObjects[newType] ? defaultObjects[newType].name : "Unknown")}
                        <input 
                            className="border rounded px-2 py-1"
                            placeholder={"Name for " + (defaultObjects[newType] ? defaultObjects[newType].name : "Unknown")}
                            value={newItem}
                            onChange={(event) => {
                                setNewItem(event.target.value)
                            }}
                        />
                    </>}
                    onClick={() => {
                        let tempNotes = [...notes]
                        let newIndex = Object.keys(notes[index]).length
                        tempNotes[index][newIndex] = {...defaultObjects[newType], name: newItem}
                        setNotes(tempNotes)
                        setCharacterElements(Object.keys(tempNotes[index]).slice(1))
                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        setNewItem("")
                        setPopUp(false)
                    }}
                    cancel={() => {
                        setNewItem("")
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
        </div>
	)
}

export default Footer
