// Packages
import { useState } from 'react'
// Character Notes
import Backstory from './Backstory'
import Footer from './Footer'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'

const NoteCard = (props) => {
    const { isAdmin, character } = props
    const [cardExpandedClass, setCardExpandedClass] = useState(" h-80")

    return (
        <Card className={"transition-all duration-500 ease-out" + cardExpandedClass}>
            <CardTitle>
                {character.name + " (" + character.position + ")"}
            </CardTitle>
            <div className="mx-4 scrollbar-hide overflow-scroll divide-y w-fit">
                <Backstory isAdmin={isAdmin} backstory={character.backstory} />
            </div>
            <Footer setCardExpandedClass={setCardExpandedClass} />
        </Card>
	)
}

export default NoteCard
