// Packages
import { Fragment } from 'react'
// VotingSystem
import VoteResults from './VoteResults'
import IndividualArchivedVote from './IndividualArchivedVote'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Helpers
import { returnChildOfObject } from '../../helpers/misc'

const VoteGrid = (props) => {
    const { currentVote, votes } = props
    const votingSystemArray = Object.keys(returnChildOfObject(
        votes, 
        [currentVote], 
        {}
    ) ? returnChildOfObject(
        votes, 
        [currentVote], 
        {}
    ) : {})

    return (
        <Card className="w-112 h-96">
            <CardTitle className="text-sm">{
                returnChildOfObject(
                    votes, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</CardTitle>
            <VoteResults 
                votes={votes}
                currentVote={currentVote}
            />
            <section className="flex flex-wrap my-auto justify-center scrollbar-hide overflow-scroll">
                {votingSystemArray.map((vote, i) => {
                    if (vote === "locked" || vote === "description" || vote === "defaultVoters") {
                        return <Fragment key={i}></Fragment>
                    } else {
                        return (
                            <IndividualArchivedVote 
                                key={i}
                                className="flex-1"
                                votes = {votes}
                                currentVote = {currentVote}
                                vote={vote}
                            />
                        )
                    }
                })}
            </section>
        </Card>
	)
}

export default VoteGrid
