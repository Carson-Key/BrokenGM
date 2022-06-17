// Packages
import { useState, useContext } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import ConfirmationPopUp from '../../ui/ConfirmationPopUp'
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
    const [expandBlock, setExpandBlock] = useState((content.match(/(\w+)/g) ? content.match(/(\w+)/g).length : 0) > 100 ? false : true)
    const [contentState, setContentState] = useState(content)
    const [popUp, setPopUp] = useState(false)

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandBlock}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={
                        <ConditionalRender
                            condition={content.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi)}
                            returnComponent={<p className="mx-2">{content}</p>}
                        >
                            <a href={content} target="_blank" rel="noreferrer noopener" className="text-sky-500 underline mx-2">To Link</a>
                        </ConditionalRender>
                    }
                >
                    <textarea
                        className="border w-full rounded px-1 py-1 h-96"
                        placeholder={"Edit " + name}
                        value={contentState}
                        onChange={(event) => {setContentState(event.target.value)}}
                    >{content}</textarea>
                </ConditionalRender>
            </ConditionalRender>
            <div className={"w-full flex mt-2 py-2 " + (expandBlock && isAdmin ? "justify-between" : "justify-end")}>
                <ConditionalRender 
                    condition={isAdmin}
                >
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
                                setPopUp(true)
                            }}
                        >Delete</button>
                    </div>
                </ConditionalRender>
                <button className="flex text-lg text-blue-500" 
                    onClick={() => {setExpandBlock(!expandBlock)}
                }>{moreLessTextDecider(expandBlock)}</button>
            </div>
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message={"Are you sure you want to delete " + name}
                    onClick={() => {
                        let tempNotes = [...notes]
                        tempNotes[index][elementIndex] = {
                            ...tempNotes[index][elementIndex],
                            content: contentState
                        }
                        delete tempNotes[index][elementIndex]
                        setNotes(tempNotes)
                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        setPopUp(false)
                    }}
                    cancel={() => {
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
        </div>
	)
}

export default Block
