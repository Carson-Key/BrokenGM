// Packages
import { useState, useContext } from 'react'
import { FaTrash } from "react-icons/fa"
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

const NamedList = (props) => {
    const { 
        isAdmin, name, list, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex
    } = props
    const [expandNamedList, setExpandNamedList] = useState((list.length > 5) ? false : true)
    const [namedList, setNamedList] = useState(list)
    const [resetInputValues, setResetInputValues] = useState(namedList.length)
    const [popUp, setPopUp] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(null)
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
                                            <p>{element.content}</p>
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
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandNamedList ? "justify-between" : "justify-end")}>
                <button 
                    disabled={expandNamedList}
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
                            setPopUp(false)
                        }
                    }}
                    cancel={() => {
                        setIndexToDelete(false)
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
        </div>
	)
}

export default NamedList
