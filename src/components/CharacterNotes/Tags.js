// Packages
import { useState, useContext } from 'react'
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'

const Tags = (props) => {
    const { 
        tags, setNotes, index, 
        notes, isCharacterNotes, id
    } = props
    const [expandList, setExpandList] = useState((tags.length > 5) ? false : true)
    const [tagsState, setTagsState] = useState([...tags])
    const setNotification = useContext(NotificationContext)[1]
    const [newTag, setNewTag] = useState("")

    return (
        <div>
            <h4 className="text-xl font-semibold">Tags</h4>
            <ConditionalRender 
                condition={expandList}
            >
                <div className="flex flex-wrap gap-3 w-full px-2 break-words">
                    {tagsState.map((element, i) => {
                        return (
                            <div className="flex gap-2 border-2 rounded" key={i}>
                                <p key={i} className="border-r bg-gray-200 h-full px-2 py-1">{element}</p>
                                <button onClick={() => {
                                    let tempNotes = [...notes]
                                    let tempList = [...tags]
                                    tempList.splice(i, 1)
                                    tempNotes[index][0] = {
                                        ...tempNotes[index][0],
                                        tags: tempList
                                    }
                                    setNotes(tempNotes)
                                    setTagsState(tempList)
                                    updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                                }}>
                                    <FaTrash className="text-red-500 mr-2"/>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center px-8 mt-3">
                    <input
                        className="border w-full rounded px-1 py-1"
                        placeholder="Add to Tags"
                        value={newTag}
                        onChange={(event) => {setNewTag(event.target.value)}}
                    />
                    <button 
                        className="mx-2"
                        onClick={() => {
                            let tempNotes = [...notes]
                            let tempList = [...tags]
                            tempList.push(newTag)
                            tempNotes[index][0] = {
                                ...tempNotes[index][0],
                                tags: tempList
                            }
                            setNotes(tempNotes)
                            setTagsState(tempList)
                            updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        }}
                    ><GrAddCircle/></button>
                </div>
            </ConditionalRender>
            <div className="w-full flex mt-2 py-2 justify-end">
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandList(!expandList)}
                }>{moreLessTextDecider(expandList)}</button>
            </div>
        </div>
	)
}

export default Tags
