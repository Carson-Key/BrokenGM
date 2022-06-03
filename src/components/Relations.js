const Relations = (props) => {
    const { relations, isAdmin, uid, players } = props

    return (
        relations.map((relation, i) => {
            return (<p key={i}>This is Relation: {relation}</p>)
        })
    )
}

export default Relations
