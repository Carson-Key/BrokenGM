// Packages
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Helpers
import { formatCharacterName, reverseFormatCharacterName } from "../../../helpers/voting"
import { removeElementFromArray } from "../../../helpers/misc"

const DefaultVoters = (props) => {
    const { 
        defaultVoters, defaultVotersObject, 
        setDefaultVoters, setDefaultVotersObject,
        afterAddFunc, afterRemoveFunc
    } = props
    const [newDfaultVoter, setNewDefaultVoter] = useState("")

    return (
        <>
            <div className="flex flex-wrap">
                {
                    defaultVoters.map((voter, i) => {
                        return (
                            <div key={i} className={
                                    "w-1/2 py-2 px-2 flex justify-between" +
                                    ((i < defaultVoters.length - ((defaultVoters.length % 2 !== 0) ? 1 : 2)) ? " border-b" : "") +
                                    (((i % 2 === 0) && (defaultVoters.length > 1)) ? " border-r" : "")
                                }
                            >
                                {formatCharacterName(voter)}
                                <button className="text-red-500"
                                    onClick={() => {
                                        let tempDefaultVotersObject = {...defaultVotersObject}
                                        let tempDefaultVoters = removeElementFromArray([...defaultVoters], voter)
                                        delete tempDefaultVotersObject[voter]
                                        afterRemoveFunc(tempDefaultVotersObject)
                                        setDefaultVoters(tempDefaultVoters)
                                        setDefaultVotersObject(tempDefaultVotersObject)
                                    }}
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2 mx-auto w-fit h-fit">
                <input 
                    className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-32 inline"
                    type="text"
                    name="Add Character"
                    placeholder="John Doe"
                    value={newDfaultVoter}
                    onChange={(event) => {
                        setNewDefaultVoter(event.target.value)
                    }}
                />
                <button
                    onClick={
                        () => {
                            const formattedName = reverseFormatCharacterName(newDfaultVoter)
                            afterAddFunc(formattedName)
                            setNewDefaultVoter("")
                            setDefaultVotersObject({...defaultVotersObject, [formattedName]: ""})
                            setDefaultVoters([...defaultVoters, formattedName])
                        }
                    }
                >
                    <GrAddCircle className="inline h-9 mx-1 mb-1" />
                </button>
            </div>
        </>
    )
}

export default DefaultVoters
