const CharacterRelationController = (props) => {
    const { character, relation } = props

    return (
        <div className="mt-2 mx-auto w-fit text-center flex text-md md:text-3xl">
            <div className="border-y border-l rounded-l-md px-1 py-1 md:px-3 md:py-2 divide divide-x">
                <button 
                    className="px-2"
                >
                    +
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
                    className="px-2"
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default CharacterRelationController
