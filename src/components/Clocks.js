const Clocks = (props) => {
    const { clocks, isAdmin, uid, players } = props

    return (
        clocks.map((clock, i) => {
            return (<p key={i}>This is Clock: {clock}</p>)
        })
    )
}

export default Clocks
