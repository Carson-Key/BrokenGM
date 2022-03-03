// Contexts
import { NotificationContext } from '../contexts/Notification'
// Helpers
import { useState, useContext } from "react/cjs/react.development"
import { changeRelationValue } from "../helpers/relation"

const CharacterRelationController = (props) => {
    const { id, index, character, relation, setRelations, relations, isRelation } = props
    const [changeByValue, setChangeByValue] = useState()
    const setNotification = useContext(NotificationContext)[1]

    return (
        <div className="mt-2 mx-auto w-fit text-center flex text-md">
            <div className="border-y border-l rounded-l-md px-1 py-1 divide divide-x">
                <button 
                    className="px-2"
                    onClick={() => {
                        changeRelationValue(
                            changeByValue, index, character, 
                            relations, setRelations,
                            setNotification, id, isRelation
                        )
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
                        changeRelationValue(
                            (changeByValue * -1), index, character, 
                            relations, setRelations,
                            setNotification, id, isRelation
                        )
                    }}
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default CharacterRelationController
