// Packages
import { useState, Fragment, useContext } from 'react'
import { FaLockOpen, FaLock, FaTrash } from "react-icons/fa"
// Character Notes
import Block from './Block'
import List from './List'
import NamedList from './NamedList'
import BasicInfo from './BasicInfo'
import Tags from './Tags'
import Footer from './Footer'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
import ConfirmationPopUp from '../../ui/ConfirmationPopUp'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { updateDocument } from '../../helpers/firestore'

const NoteCard = (props) => {
    const { 
        isAdmin, character, setNotes, index, 
        notes, isCharacterNotes, id
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [cardExpandedClass, setCardExpandedClass] = useState(" h-112")
    const [characterElements, setCharacterElements] = useState(Object.keys(character).slice(1))
    const [locked, setLocked] = useState(character[0].locked)
    const [popUp, setPopUp] = useState(false)

    return (
        <Card className={"transition-all duration-500 ease-out w-112 " + cardExpandedClass}>
            <CardTitle className="flex justify-between">
                <div className="w-5">
                    <ConditionalRender condition={isAdmin && !locked}>
                        <button
                            onClick={() => {
                                setPopUp(true)
                            }}
                        ><FaTrash/></button>
                    </ConditionalRender>
                </div>
                <p className="w-fit mx-3">
                    {character[0].name + (character[0].position ? ((
                        character[0].position.toLowerCase() === "n/a" ||
                        character[0].position.toLowerCase() === "" ||
                        character[0].position.toLowerCase() === "none" || 
                        character[0].position.toLowerCase() === "unknown"
                    )
                        ? "" : " (" + character[0].position + ")") : "")
                    }
                </p>
                <button className="w-4" onClick={() => {
                    let tempNotes = [...notes]
                    tempNotes[index][0] = {
                        ...tempNotes[index][0],
                        locked: !locked
                    }
                    setNotes(tempNotes)
                    setLocked(!locked)
                    updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                }}>
                    {(locked) ? <FaLock/> : <FaLockOpen/>}
                </button>
            </CardTitle>
            <div className="px-4 scrollbar-hide overflow-scroll divide-y w-full">
                <BasicInfo 
                    isAdmin={isAdmin && !locked} name={character[0].name} 
                    position={character[0].position} setNotes={setNotes}
                    status={character[0].status} index={index} notes={notes}
                    isCharacterNotes={isCharacterNotes} id={id}
                />
                {
                    characterElements.map((elementIndex, i) => {
                        const element = character[elementIndex]
                        if (element) {
                            if (element.type === "block") {
                                return (<Block 
                                    key={i} isAdmin={isAdmin && !locked} content={element.content} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id} openStatus={element.openStatus}
                                />)
                            } else if (element.type === "list") {
                                return (<List
                                    key={i} isAdmin={isAdmin && !locked} list={element.list} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id} openStatus={element.openStatus}
                                />)
                            } else if (element.type === "namedlist") {
                                return (<NamedList
                                    key={i} isAdmin={isAdmin && !locked} list={element.list} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id} openStatus={element.openStatus}
                                />)
                            } else {
                                return <Fragment key={i} />
                            }
                        } else {
                            return <Fragment key={i} />
                        }
                    })
                }
                <ConditionalRender condition={isAdmin && !locked}>
                    <Tags 
                        isAdmin={isAdmin} tags={character[0].tags} setNotes={setNotes} 
                        index={index} notes={notes} isCharacterNotes={isCharacterNotes} 
                        id={id}
                    />
                </ConditionalRender>
            </div>
            <Footer 
                isAdmin={isAdmin && !locked} setCardExpandedClass={setCardExpandedClass} 
                setNotes={setNotes} notes={notes} id={id} 
                index={index} isCharacterNotes={isCharacterNotes}
                setCharacterElements={setCharacterElements}
            />
            <ConditionalRender condition={popUp}>
                <ConfirmationPopUp
                    message="Are you sure you want to delete this note card"
                    onClick={() => {
                        let tempNotes = [...notes]
                        tempNotes.splice(index, 1)
                        setNotes(tempNotes)
                        updateDocument("characternotes", id, {characters: tempNotes}, setNotification, isCharacterNotes)
                        setPopUp(false)
                    }}
                    cancel={() => {
                        setPopUp(false)
                    }}
                />
            </ConditionalRender>
        </Card>
	)
}

export default NoteCard
