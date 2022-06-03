const VotingSystems = (props) => {
    const { votingSystems, isAdmin, uid, players } = props

    return (
        votingSystems.map((votingSystem, i) => {
            return (<p key={i}>This is Voting System: {votingSystem}</p>)
        })
    )
}

export default VotingSystems
