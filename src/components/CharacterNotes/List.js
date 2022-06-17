// Packages
import { useState, useContext } from 'react'
// Character Notes
import VariableTextArea from './VariableTextArea'
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'

const List = (props) => {
    const { 
        isAdmin, name, list, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex
    } = props
    const [expandList, setExpandList] = useState((list.length > 5) ? false : true)
    const [listState, setListState] = useState([...list])
    const [resetInputValues, setResetInputValues] = useState(false)
    const setNotification = useContext(NotificationContext)[1]

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
                            )
                        })}
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandList ? "justify-between" : "justify-end")}>
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
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandList(!expandList)}
                }>{moreLessTextDecider(expandList)}</button>
            </div>
        </div>
	)
}

export default List
