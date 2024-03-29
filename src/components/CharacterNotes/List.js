// Packages
import { useState, useContext } from 'react'
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Character Notes
import VariableTextArea from './VariableTextArea'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Input from '../../ui/Input'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
import { PopUpContext } from '../../contexts/PopUp'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'
import { firePopUp } from '../../helpers/popup'

const List = (props) => {
    const { 
        isAdmin, name, list, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex, openStatus
    } = props
    const [expandList, setExpandList] = useState(openStatus)
    const [listState, setListState] = useState([...list])
    const [resetInputValues, setResetInputValues] = useState(false)
    const setNotification = useContext(NotificationContext)[1]
    const setPopUp = useContext(PopUpContext)[1]
    const [newItem, setNewItem] = useState("")

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandList}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={                  
                        <div className="flex flex-col w-full px-2 break-words">
                            {list.map((element, i) => {
                                return (
                                    <ConditionalRender
                                        key={i}
                                        condition={element.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi)}
                                        returnComponent={<p key={i} className="my-2">{element}</p>}
                                    >
                                        <a href={element} target="_blank" rel="noreferrer noopener" className="text-sky-500 underline my-2">To Link</a>
                                    </ConditionalRender>
                                )
                            })}
                        </div>
                    }
                >
                    <div className="flex flex-col w-full px-2 break-words">
                        {listState.map((element, i) => {
                            return (
                                <div className="flex gap-2" key={i}>
                                    <VariableTextArea
                                        value={element}
                                        placeholder={"Change the Value of this Item"}
                                        index={i}
                                        values={listState} 
                                        setValue={setListState}
                                        changeValues={(tempValues, index, inputValue) => {
                                            tempValues[index] = inputValue
                                        }}
                                        resetInputValues={resetInputValues}
                                        setResetInputValues={setResetInputValues}
                                    />
                                    <button onClick={() => {
                                        firePopUp(
                                            "Are you sure you want to delete this list item",
                                            () => {
                                                let tempNotes = [...notes]
                                                let tempList = [...listState]
                                                tempList.splice(i, 1)
                                                tempNotes[index][elementIndex] = {
                                                    ...tempNotes[index][elementIndex],
                                                    list: tempList
                                                }
                                                setNotes(tempNotes)
                                                setListState(tempList)
                                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                                            },
                                            () => {
                                            },
                                            setPopUp
                                        )
                                    }}>
                                        <FaTrash className="text-red-500"/>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center px-8 mt-3">
                        <textarea
                            className="border w-full rounded px-1 py-1"
                            placeholder={"Add to " + name}
                            value={newItem}
                            onChange={(event) => {setNewItem(event.target.value)}}
                        />
                        <button 
                            className="mx-2"
                            onClick={() => {
                                let tempNotes = [...notes]
                                let tempList = [...listState]
                                tempList.push(newItem)
                                tempNotes[index][elementIndex] = {
                                    ...tempNotes[index][elementIndex],
                                    list: tempList
                                }
                                setNotes(tempNotes)
                                setListState(tempList)
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                                setNewItem("")
                            }}
                        ><GrAddCircle/></button>
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandList && isAdmin ? "justify-between" : "justify-end")}>
                <ConditionalRender 
                    condition={isAdmin}
                >
                    <div className="flex gap-2">
                        <button 
                            disabled={!expandList}
                            className={
                                expandList ?
                                "bg-green-500 text-white rounded px-2 py-1" :
                                "hidden"
                            }
                            onClick={() => {
                                let tempNotes = [...notes]
                                tempNotes[index][elementIndex] = {
                                    ...tempNotes[index][elementIndex],
                                    list: listState
                                }
                                setNotes(tempNotes)
                                setResetInputValues(0)
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            }}
                        >Update</button>
                        <button 
                            disabled={!expandList}
                            className={
                                expandList ?
                                "bg-red-500 text-white rounded px-2 py-1" :
                                "hidden"
                            }
                            onClick={() => {
                                firePopUp(
                                    "Are you sure you want to delete " + name,
                                    () => {
                                        let tempNotes = [...notes]
                                        delete tempNotes[index][elementIndex]
                                        setNotes(tempNotes)
                                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                                    },
                                    () => {},
                                    setPopUp
                                )
                            }}
                        >Delete</button>
                    </div>
                </ConditionalRender>
                <div className="flex">
                    <ConditionalRender 
                        condition={isAdmin}
                    >
                        <Input 
                            onChange={(event) => {
                                let tempNotes = [...notes]
                                tempNotes[index][elementIndex] = {
                                    ...tempNotes[index][elementIndex],
                                    openStatus: !openStatus
                                }
                                setNotes(tempNotes)
                                setResetInputValues(0)
                                updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                            }}
                            labelClass="px-2 my-auto"
                            inputClass="mr-1"
                            name={"Default Expanded checkbox for " + name}
                            labelText="Default to Expanded"
                            checked={openStatus}
                            type="checkbox"
                        />
                    </ConditionalRender>
                    <button className="flex text-lg text-blue-500" 
                        onClick={() => {setExpandList(!expandList)}
                    }>{moreLessTextDecider(expandList)}</button>
                </div>
            </div>
        </div>
	)
}

export default List
