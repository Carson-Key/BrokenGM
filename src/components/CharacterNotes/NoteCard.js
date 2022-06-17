// Packages
import { useState, Fragment } from 'react'
// Character Notes
import Block from './Block'
import List from './List'
import NamedList from './NamedList'
import BasicInfo from './BasicInfo'
import Footer from './Footer'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'

const NoteCard = (props) => {
    const { 
        isAdmin, character, setNotes, index, 
        notes, isCharacterNotes, id 
    } = props
    const [cardExpandedClass, setCardExpandedClass] = useState(" h-80")
    const characterElements = useState(Object.keys(character).slice(1))[0]

    return (
        <Card className={"transition-all duration-500 ease-out w-112 h-112 " + cardExpandedClass}>
            <CardTitle>
                {character[0].name + (character[0].position ? ((
                    character[0].position.toLowerCase() === "n/a" ||
                    character[0].position.toLowerCase() === "" ||
                    character[0].position.toLowerCase() === "none" || 
                    character[0].position.toLowerCase() === "unknown"
                )
                    ? "" : " (" + character[0].position + ")") : "")
                }
            </CardTitle>
            <div className="px-4 scrollbar-hide overflow-scroll divide-y w-full">
                <BasicInfo 
                    isAdmin={isAdmin} name={character[0].name} 
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
                                    key={i} isAdmin={isAdmin} content={element.content} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id}
                                />)
                            } else if (element.type === "list") {
                                return (<List
                                    key={i} isAdmin={isAdmin} list={element.list} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id}
                                />)
                            } else if (element.type === "namedlist") {
                                return (<NamedList
                                    key={i} isAdmin={isAdmin} list={element.list} elementIndex={i+1}
                                    name={element.name} setNotes={setNotes} index={index}
                                    notes={notes} isCharacterNotes={isCharacterNotes} id={id}
                                />)
                            } else {
                                return <Fragment key={i} />
                            }
                        } else {
                            return <Fragment key={i} />
                        }
                    })
                }
            </div>
            <Footer isAdmin={isAdmin} setCardExpandedClass={setCardExpandedClass} />
        </Card>
	)
}

export default NoteCard
