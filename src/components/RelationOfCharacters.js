// Helepr
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
                    <div className="mt-2 mx-auto w-fit text-center flex text-md md:text-3xl">
                        <div className="border-y border-l rounded-l-md px-1 py-1 md:px-3 md:py-2 divide divide-x">
                            <button 
                                key={i}
                                className="px-2"
                            >
                                -
                            </button>
                        </div>
                        <input 
                            className="bg-gray-100 text-center px-1 py-1 md:px-3 w-10 md:w-40"
                            type="text" 
                            name="Change Clock" 
                            placeholder={relation[character]}
                        />
                        <div className="border-y border-r rounded-r-md px-1 py-1 md:px-3 md:py-2 divide divide-x">
                            <button 
                                key={i}
                                className="px-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default RelationOfCharacter
