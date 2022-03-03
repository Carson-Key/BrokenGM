const CharacterRelationController = (props) => {
    const { index, character, relation, setRelations, relations } = props

    return (
        <div className="mt-2 mx-auto w-fit text-center flex text-md">
            <div className="border-y border-l rounded-l-md px-1 py-1 divide divide-x">
                <button 
                    className="px-2"
                    onClick={() => {
                        let tempRelations = [...relations]
                        tempRelations[index][character] = 10
                        setRelations(tempRelations)
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
            />
            <div className="border-y border-r rounded-r-md px-1 py-1 divide divide-x">
                <button 
                    className="px-2"
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default CharacterRelationController
