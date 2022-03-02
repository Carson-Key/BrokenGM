// Components
import Card from './Card'
import CardTitle from './CardTitle'
// Helepr
import { formatCharacterName } from '../helpers/relation'

const RelationCard = (props) => {
    const { name, relation } = props
    const relationKeys = Object.keys(relation).sort()

    return (
        <Card className="h-fit">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="my-6 mx-auto w-fit">
                {
                    relationKeys.map((character, i) => {
                        return (
                            <div>
                                <p key={i}>{formatCharacterName(character)}</p>
                                <div 
                                    className="rounded h-2 w-full bg-gradient-to-r from-red-500 via-grey-500 to-green-500"
                                ></div>
                            </div>
                        )
                    })
                }
            </div>
        </Card>
	)
}

export default RelationCard
