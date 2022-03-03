// Components
import RelationOfCharacter from './RelationOfCharacters'
import AddCharacterRelation from '../components/AddCharacterRelation'
// UI
import Card from './Card'
import CardTitle from './CardTitle'

const RelationCard = (props) => {
    const { name, relation, isAdmin, setRelations, relations, index, id, isRelation } = props
    const relationKeys = Object.keys(relation).sort()

    return (
        <Card className="h-80">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="my-3 mx-4 w-72 overflow-scroll h-64 divide-y">
                <RelationOfCharacter
                    id={id}
                    isRelation={isRelation}
                    relation={relation}
                    relationKeys={relationKeys}
                    isAdmin={isAdmin}
                    index={index}
                    relations={relations}
                    setRelations={setRelations}
                />
                <AddCharacterRelation 
                    id={id}
                    index={index}
                    setRelations={setRelations}
                    relations={relations}
                    isRelation={isRelation}
                />
            </div>
        </Card>
	)
}

export default RelationCard
