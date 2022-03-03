// Helpers
import { RELATIONINDICATORCLASSES } from '../helpers/objects'
import { defaultAccessArray } from '../helpers/misc'

const CharacterRelationIndicator = (props) => {
    const { character, relation } = props

    return (
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
    )
}

export default CharacterRelationIndicator
