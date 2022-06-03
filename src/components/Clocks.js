const Clocks = (props) => {
    const { clocks } = props

    return (
        clocks.map((clock, i) => {
            return (<p key={i}>This is Clock: {clock}</p>)
        })
    )
}

export default Clocks
