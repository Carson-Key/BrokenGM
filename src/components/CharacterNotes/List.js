// Packages
import { useState, useContext } from 'react'
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Character Notes
import VariableTextArea from './VariableTextArea'
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

const List = (props) => {
    const { 
        isAdmin, name, list, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex
    } = props
    const [expandList, setExpandList] = useState((list.length > 5) ? false : true)
    const [listState, setListState] = useState([...list])
    const [popUp, setPopUp] = useState(false)
    const [deleteCatPopUp, setDeleteCatPopUp] = useState(false)
    const [resetInputValues, setResetInputValues] = useState(false)
    const setNotification = useContext(NotificationContext)[1]
    const [indexToDelete, setIndexToDelete] = useState(null)
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
                                return (<p key={i} className="my-2">{element}</p>)
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
                                        setIndexToDelete(i)
                                        setPopUp(true)
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
                            }}
                        ><GrAddCircle/></button>
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandList ? "justify-between" : "justify-end")}>
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
                                setDeleteCatPopUp(true)
                            }}
                        >Delete</button>
                    </div>
                </ConditionalRender>
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandList(!expandList)}
                }>{moreLessTextDecider(expandList)}</button>
            </div>
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message="Are you sure you want to delete this list item"
                    onClick={() => {
                        if (indexToDelete) {
                            let tempNotes = [...notes]
                            let tempList = [...listState]
                            tempList.splice(indexToDelete, 1)
                            tempNotes[index][elementIndex] = {
                                ...tempNotes[index][elementIndex],
                                list: tempList
                            }
                            setNotes(tempNotes)
                            setListState(tempList)
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

export default List
