// UI
import Vote from '../ui/Vote'

const VoteSystemGrid = (props) => {
    const { votes } = props

    return (
        votes.map((vote, i) => {
            if (vote.locked  === true) {
                return (
                    <Vote 
                        votes={votes}
                        currentVote={i}
                    />
                )
            } else {
                return <></>
            }
        })
	)
}

export default VoteSystemGrid
