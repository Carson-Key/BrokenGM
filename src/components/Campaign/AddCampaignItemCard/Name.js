const Name = (props) => {
    const { name, setName } = props

    return (
        <input
            onChange={(event) => {
                setName(event.target.value)
            }}
            value={name}
            className="w-40 border rounded px-2 py-1 ml-2 my-2"
            name="name"
            type="text"
            placeholder="Name"
        />
    )
}

export default Name
