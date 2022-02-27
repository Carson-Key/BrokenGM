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
                            <p key={i}>{formatCharacterName(character)}</p>
                        )
                    })
                }
            </div>
        </Card>
	)
}

export default RelationCard
