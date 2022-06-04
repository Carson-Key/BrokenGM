// Packages
import { Fragment } from 'react'
// VotingSystem
import VoteGrid from './VoteGrid'

const VoteSystemGrid = (props) => {
    const { votes } = props

    return (
        <section className="flex flex-wrap justify-center">
            {
                votes.map((vote, i) => {
                    if (vote.locked  === true) {
                        return (
                            <VoteGrid
                                key={i}
                                votes={votes}
                                currentVote={i}
                            />
                        )
                    } else {
                        return <Fragment key={i}></Fragment>
                    }
                })
            }
        </section>
	)
}

export default VoteSystemGrid
