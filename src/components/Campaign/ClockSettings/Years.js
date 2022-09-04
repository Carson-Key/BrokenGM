const Years = (props) => {
    const { yearSuffix, setYearSuffix, yearPrefix, setYearPrefix } = props

    return (
        <>
            <div className="px-2 flex">
                <h5 className="my-auto">Year Suffix: </h5>    
                <input
                    onChange={(event) => {
                        setYearSuffix(event.target.value)
                    }}
                    value={yearSuffix}
                    className="w-40 border rounded px-2 py-1 ml-2 my-2"
                    name="Year Suffix"
                    type="text"
                    placeholder="Year Suffix"
                />
            </div>
            <div className="px-2 flex">
                <h5 className="my-auto">Year Prefix: </h5>   
                <input
                    onChange={(event) => {
                        setYearPrefix(event.target.value)
                    }}
                    value={yearPrefix}
                    className="w-40 border rounded px-2 py-1 ml-2 my-2"
                    name="Year Prefix"
                    type="text"
                    placeholder="Year Prefix"
                />
            </div>
        </>
    )
}

export default Years
