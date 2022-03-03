// Components
import CharacterRelationController from './CharacterRelationController'
// Helpers
import { formatCharacterName } from '../helpers/relation'
import { RELATIONINDICATORCLASSES } from '../helpers/objects'
import { defaultAccessArray } from '../helpers/misc'

const RelationOfCharacter = (props) => {
    const { relationKeys, relation } = props

    return (
        relationKeys.map((character, i) => {
            return (
                <div key={i} className="my-3">
                    <p >{formatCharacterName(character)}</p>
                    <div 
                        className="rounded-lg h-fit w-full bg-gradient-to-r from-red-500 to-green-500"
                    >
                        <div 
                            className={
                                "bg-black h-3 w-1 px-0.5 rounded-lg " + 
                                defaultAccessArray(
                                    RELATIONINDICATORCLASSES, relation[character], "hidden"
                                )
                            }
                        ></div>
                    </div>
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
