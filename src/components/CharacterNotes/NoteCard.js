// Packages
import { useState } from 'react'
// Character Notes
import Backstory from './Backstory'
import BasicInfo from './BasicInfo'
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
            <div className="px-4 scrollbar-hide overflow-scroll divide-y w-full">
                <BasicInfo 
                    isAdmin={isAdmin} name={character.name} 
                    position={character.position} dob={character.dob}
                    status={character.status}
                />
                <Backstory isAdmin={isAdmin} backstory={character.backstory} />
            </div>
            <Footer setCardExpandedClass={setCardExpandedClass} />
        </Card>
	)
}

export default NoteCard
