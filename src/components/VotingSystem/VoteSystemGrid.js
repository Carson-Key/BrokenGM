// Packages
import { Fragment, useState } from 'react'
// VotingSystem
import VoteGrid from './VoteGrid'

const VoteSystemGrid = (props) => {
    const { votes } = props
    let votesDisplayed = 0

    return (
        <section className="flex flex-wrap justify-center">
            {
                votes.map((vote, i) => {
                    if (vote.locked  === true) {
                        votesDisplayed = votesDisplayed + 1
                        return (
                            <VoteGrid
                                key={i}
                                votes={votes}
                                currentVote={i}
                            />
                        )
                    } else if ((i === votes.length - 1) && (votesDisplayed === 0)) {
                        return (
                            <h2 
                                key={i} 
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                                    There are no Past Votes
                            </h2>
                        )
                    }
                    else {
                        return <Fragment key={i}></Fragment>
                    }
                })
            }
        </section>
	)
}

export default VoteSystemGrid
