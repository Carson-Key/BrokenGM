const VotingSystems = (props) => {
    const { votingSystems } = props

    return (
        votingSystems.map((votingSystem, i) => {
            return (<p key={i}>This is Voting System: {votingSystem}</p>)
        })
    )
}

export default VotingSystems
