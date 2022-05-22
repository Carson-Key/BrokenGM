// UI
import VoteGrid from '../ui/VoteGrid'

const VoteSystemGrid = (props) => {
    const { votes } = props

    return (
        <section className="flex flex-wrap justify-center">
            {
                votes.map((vote, i) => {
                    if (vote.locked  === true) {
                        return (
                            <VoteGrid
                                votes={votes}
                                currentVote={i}
                            />
                        )
                    } else {
                        return <></>
                    }
                })
            }
        </section>
	)
}

export default VoteSystemGrid
