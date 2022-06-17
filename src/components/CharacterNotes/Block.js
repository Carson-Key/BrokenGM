// Packages
import { useState, useContext } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'
import { updateDocument } from '../../helpers/firestore'

const Block = (props) => {
    const {       
        isAdmin, name, content, setNotes, index, 
        notes, isCharacterNotes, id, elementIndex
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [expandBlock, setExpandBlock] = useState(content.match(/(\w+)/g).length > 100 ? false : true)
    const [contentState, setContentState] = useState(content)

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandBlock}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={<p>{content}</p>}
                >
                    <textarea
                        className="border w-full rounded px-1 py-1 h-96"
                        placeholder={"Edit " + name}
                        value={contentState}
                        onChange={(event) => {setContentState(event.target.value)}}
                    >{content}</textarea>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandBlock ? "justify-between" : "justify-end")}>
                <div className="flex gap-2">
                    <button 
                        disabled={!expandBlock}
                        className={
                            expandBlock ?
                            "bg-green-500 text-white rounded px-2 py-1" :
                            "hidden"
                        }
                        onClick={() => {
                            let tempNotes = [...notes]
                            tempNotes[index][elementIndex] = {
                                ...tempNotes[index][elementIndex],
                                content: contentState
                            }
                            setNotes(tempNotes)
                            updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        }}
                    >Update</button>
                    <button 
                        disabled={!expandBlock}
                        className={
                            expandBlock ?
                            "bg-red-500 text-white rounded px-2 py-1" :
                            "hidden"
                        }
                        onClick={() => {
                            let tempNotes = [...notes]
                            tempNotes[index][elementIndex] = {
                                ...tempNotes[index][elementIndex],
                                content: contentState
                            }
                            delete tempNotes[index][elementIndex]
                            setNotes(tempNotes)
                            updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        }}
                    >Delete</button>
                </div>
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandBlock(!expandBlock)}
                }>{moreLessTextDecider(expandBlock)}</button>
            </div>
        </div>
	)
}

export default Block
