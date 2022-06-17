// Packages
import { useState, useContext } from 'react'
// Character Notes
import VariableInput from './VariableInput'
// Components
import ConditionalRender from '../ConditionalRender'
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
                                    <div className="mt-1" key={i}>
                                        <div className="flex flex-wrap gap-2">
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
                                    </div>
                                )
                            })
                        }
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <div className="w-full flex justify-evenly mt-2 py-2">
                <button 
                    className="bg-green-500 text-white rounded px-2 py-1"
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
        </div>
	)
}

export default NamedList
