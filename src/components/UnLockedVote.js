// Components
import VoteResults from './VoteResults'
// UI
import IndividualArchivedVote from '../ui/IndividualArchivedVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'

const UnLockedVote = (props) => {
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
        <section className="mx-auto">
            <h2 className="text-center">{
                returnChildOfObject(
                    votes, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</h2>
            <VoteResults 
                votes={votes}
                currentVote={currentVote}
            />
            <section className="flex flex-col my-4 justify-center divide-y overflow-scroll">
                {votingSystemArray.map((vote, i) => {
                    if (vote === "locked" || vote === "description" || vote === "defaultVoters") {
                        return null
                    } else {
                        return (
                            <IndividualArchivedVote 
                                key={i}
                                votes = {votes}
                                currentVote = {currentVote}
                                vote={vote}
                            />
                        )
                    }
                })}
            </section>
        </section>
	)
}

export default UnLockedVote
