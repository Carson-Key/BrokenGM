// Components
import CharacterRelationController from '../components/CharacterRelationController'
import ConditionalRender from '../components/ConditionalRender'
// UI
import CharacterRelationIndicator from './CharacterRelationIndicator'
// Helpers
import { formatCharacterName } from '../helpers/relation'

const RelationOfCharacter = (props) => {
    const { relationKeys, relation, isAdmin, setRelations, index, relations, id, isRelation } = props

    return (
        relationKeys.map((character, i) => {
            return (
                <div key={i} className="my-3">
                    <p >{formatCharacterName(character)}</p>
                    <CharacterRelationIndicator
                        character={character}
                        relation={relation}
                    />
                    <ConditionalRender condition={isAdmin}>
                        <CharacterRelationController 
                            id={id}
                            isRelation={isRelation}
                            index={index}
                            character={character}
                            relation={relation}
                            relations={relations}
                            setRelations={setRelations}
                        />
                    </ConditionalRender>
                </div>
            )
        })
    )
}

export default RelationOfCharacter
