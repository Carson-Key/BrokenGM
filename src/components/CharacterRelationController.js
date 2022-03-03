// Helpers
import { useState } from "react/cjs/react.development"
import { changeRelationValue } from "../helpers/relation"

const CharacterRelationController = (props) => {
    const { index, character, relation, setRelations, relations } = props
    const [changeByValue, setChangeByValue] = useState()

    return (
        <div className="mt-2 mx-auto w-fit text-center flex text-md">
            <div className="border-y border-l rounded-l-md px-1 py-1 divide divide-x">
                <button 
                    className="px-2"
                    onClick={() => {
                        changeRelationValue(changeByValue, index, character, relations, setRelations)
                    }}
                >
                    +
                </button>
            </div>
            <input 
                className="bg-gray-100 text-center px-1 py-1 w-12"
                type="text" 
                name="Change Clock" 
                placeholder={relation[character]}
                onChange={(event) => {
                    setChangeByValue(parseInt(event.target.value))
                }}
            />
            <div className="border-y border-r rounded-r-md px-1 py-1 divide divide-x">
                <button 
                    className="px-2"
                    onClick={() => {
                        changeRelationValue((changeByValue * -1), index, character, relations, setRelations)
                    }}
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default CharacterRelationController
