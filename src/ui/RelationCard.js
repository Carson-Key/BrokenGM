// Components
import RelationOfCharacter from '../components/RelationOfCharacters'
// UI
import Card from './Card'
import CardTitle from './CardTitle'

const RelationCard = (props) => {
    const { name, relation } = props
    const relationKeys = Object.keys(relation).sort()

    return (
        <Card className="h-80">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="my-3 mx-4 w-72 overflow-scroll h-64 divide-y">
                <RelationOfCharacter
                    relation={relation}
                    relationKeys={relationKeys}
                />
            </div>
        </Card>
	)
}

export default RelationCard
