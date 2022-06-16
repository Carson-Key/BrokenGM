// Packages
import { useState } from 'react'
// Character Notes
import Backstory from './Backstory'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
import { moreLessTextDecider } from '../../helpers/misc'

const NoteCard = (props) => {
    const { isAdmin, character } = props
    const [cardExpandedClass, setCardExpandedClass] = useState(" h-80")
    const [expandCard, setExpandCard] = useState(false)

    return (
        <Card className={"transition-all duration-500 ease-out" + cardExpandedClass}>
            <CardTitle>
                {character.name + " (" + character.position + ")"}
            </CardTitle>
            <div className="mx-4 scrollbar-hide overflow-scroll divide-y w-fit">
                <Backstory isAdmin={isAdmin} backstory={character.backstory} />
            </div>
            <div className="border-t-2 border-secondary mt-auto flex justify-end">
                <button className="flex text-lg text-blue-500 my-2 mx-4" 
                    onClick={() => {
                        setExpandCard(!expandCard)
                        setCardExpandedClass((cardExpandedClass === " h-80") ? " h-1/2 w-1/2" : " h-80")
                    }
                }>{moreLessTextDecider(expandCard)}</button>
            </div>
        </Card>
	)
}

export default NoteCard
