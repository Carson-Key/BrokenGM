const Name = (props) => {
    const { name, setName } = props

    return (
        <div className="mx-2 py-4 px-2">
            <h4 className="w-40">Name</h4>
            <input
                onChange={(event) => {
                    setName(event.target.value)
                }}
                value={name}
                className="w-40 border rounded px-2 py-1"
                name="name"
                type="text"
                placeholder="Name"
            />
        </div>
    )
}

export default Name
