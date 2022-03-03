// Components
import CharacterRelationController from './CharacterRelationController'
// UI
import CharacterRelationIndicator from '../ui/CharacterRelationIndicator'
// Helpers
import { formatCharacterName } from '../helpers/relation'

const RelationOfCharacter = (props) => {
    const { relationKeys, relation } = props

    return (
        relationKeys.map((character, i) => {
            return (
                <div key={i} className="my-3">
                    <p >{formatCharacterName(character)}</p>
                    <CharacterRelationIndicator
                        character={character}
                        relation={relation}
                    />
                    <CharacterRelationController 
                        character={character}
                        relation={relation}
                    />
                </div>
            )
        })
    )
}

export default RelationOfCharacter
