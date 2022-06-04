// Relations
import RelationOfCharacter from './RelationOfCharacters'
import AddCharacterRelation from './AddCharacterRelation'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'

const RelationCard = (props) => {
    const { name, relation, isAdmin, setRelations, relations, index, id, isRelation } = props
    const relationKeys = Object.keys(relation).sort()

    return (
        <Card className="h-80">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="mx-4 w-72 scrollbar-hide overflow-scroll divide-y">
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
                <ConditionalRender condition={isAdmin}>
                    <AddCharacterRelation 
                        id={id}
                        index={index}
                        setRelations={setRelations}
                        relations={relations}
                        isRelation={isRelation}
                    />
                </ConditionalRender>
            </div>
        </Card>
	)
}

export default RelationCard
