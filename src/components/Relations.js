const Relations = (props) => {
    const { relations } = props

    return (
        relations.map((relation, i) => {
            return (<p key={i}>This is Relation: {relation}</p>)
        })
    )
}

export default Relations
