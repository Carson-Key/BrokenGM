// Packages
import { useState, useContext } from 'react'
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Character Notes
import VariableInput from './VariableInput'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import ConfirmationPopUp from '../../ui/ConfirmationPopUp'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'
import { fireError } from '../../helpers/notifications'

const NamedList = (props) => {
    const { 
        isAdmin, name, list, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex
    } = props
    const [expandNamedList, setExpandNamedList] = useState((list.length > 5) ? false : true)
    const [namedList, setNamedList] = useState(list)
    const [resetInputValues, setResetInputValues] = useState(namedList.length)
    const [deleteCatPopUp, setDeleteCatPopUp] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(null)
    const [newItem, setNewItem] = useState("")
    const setNotification = useContext(NotificationContext)[1]

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandNamedList}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={
                        <div className="px-2">{
                            namedList.map((element, i) => {
                                return (
                                    <div className="mt-1" key={i}>
                                        <div className="flex flex-wrap mx-2 gap-2">
                                            <h5 className="font-semibold">{element.name}:</h5>
                                            <ConditionalRender
                                                condition={element.content.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi)}
                                                returnComponent={<p>{element.content}</p>}
                                            >
                                                <a href={element.content} target="_blank" rel="noreferrer noopener" className="text-sky-500 underline">To Link</a>
                                            </ConditionalRender>
                                        </div>
                                    </div>
                                )
                            })
                        }</div>
                    }
                >
                    <div className="px-2">
                        {
                            namedList.map((element, i) => {
                                return (
                                    <div key={i} className="flex flex-wrap justify-between gap-2 mt-1">
                                        <div className="flex gap-2">
                                            <h5 className="font-semibold">{element.name}:</h5>
                                            <VariableInput 
                                                value={element.content}
                                                placeholder={"Change " + element.name + " Value"}
                                                index={i}
                                                values={namedList} 
                                                setValue={setNamedList}
                                                changeValues={(tempValues, index, inputValue) => {
                                                    tempValues[index].content = inputValue
                                                }}
                                                resetInputValues={resetInputValues}
                                                setResetInputValues={setResetInputValues}
                                            />
                                        </div>
                                        <button onClick={() => {
                                            setIndexToDelete(i)
                                            setPopUp(true)
                                        }}>
                                            <FaTrash className="text-red-500"/>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-center mt-3">
                        <input
                            className="border rounded px-2 py-1"
                            placeholder={"Add to " + name}
                            value={newItem}
                            onChange={(event) => {setNewItem(event.target.value)}}
                        />
                        <button 
                            className="mx-2"
                            onClick={() => {
                                let tempNotes = [...notes]
                                let tempNamedList = [...namedList]
                                tempNamedList.push({name: newItem, content: ""})
                                tempNotes[index][elementIndex] = {
                                    ...tempNotes[index][elementIndex],
                                    list: tempNamedList
                                }
                                setNotes(tempNotes)
                                setNamedList(tempNamedList)
                                setNewItem("")
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            }}
                        ><GrAddCircle/></button>
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandNamedList && isAdmin ? "justify-between" : "justify-end")}>
                <ConditionalRender 
                    condition={isAdmin}
                >
                    <div className="flex gap-2">
                        <button 
                            disabled={!expandNamedList}
                            className={
                                expandNamedList ?
                                "bg-green-500 text-white rounded px-2 py-1" :
                                "hidden"
                            }
                            onClick={() => {
                                let tempNotes = [...notes]
                                tempNotes[index][elementIndex] = {
                                    ...tempNotes[index][elementIndex],
                                    list: namedList
                                }
                                setNotes(tempNotes)
                                setResetInputValues(0)
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            }}
                        >Update</button>
                        <button 
                            disabled={!expandNamedList}
                            className={
                                expandNamedList ?
                                "bg-red-500 text-white rounded px-2 py-1" :
                                "hidden"
                            }
                            onClick={() => {
                                setDeleteCatPopUp(true)
                            }}
                        >Delete</button>
                    </div>
                </ConditionalRender>
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandNamedList(!expandNamedList)}
                }>{moreLessTextDecider(expandNamedList)}</button>
            </div>
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message={"Are you sure you want to delete " + (namedList[indexToDelete] ? namedList[indexToDelete].name : "this note")}
                    onClick={() => {
                        if (indexToDelete) {
                            let tempNotes = [...notes]
                            let tempNamedList = [...namedList]
                            tempNamedList.splice(indexToDelete, 1)
                            tempNotes[index][elementIndex] = {
                                ...tempNotes[index][elementIndex],
                                list: tempNamedList
                            }
                            setNotes(tempNotes)
                            setNamedList(tempNamedList)
                            updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            setIndexToDelete(false)
                        } else {
                            fireError(setNotification, "Nothing to delete", "You have attempted to delete nothing")
                        }
                        setPopUp(false)
                    }}
                    cancel={() => {
                        setIndexToDelete(false)
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
            <ConditionalRender condition={deleteCatPopUp}>
                <ConfirmationPopUp
                    message={"Are you sure you want to delete " + name}
                    onClick={() => {
                        let tempNotes = [...notes]
                        delete tempNotes[index][elementIndex]
                        setNotes(tempNotes)
                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        setDeleteCatPopUp(false)
                    }}
                    cancel={() => {
                        setDeleteCatPopUp(false)
                    }}
                />
            </ConditionalRender>
        </div>
	)
}

export default NamedList
