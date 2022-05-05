// Components
import VoteResults from '../components/VoteResults'
// UI
import IndividualArchivedVote from './IndividualArchivedVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'

const Vote = (props) => {
    const { votingSystemObject, currentVote } = props
    const votingSystemArray = Object.keys(returnChildOfObject(
        votingSystemObject, 
        [currentVote], 
        {}
    ) ? returnChildOfObject(
        votingSystemObject, 
        [currentVote], 
        {}
    ) : {})

    return (
        <section className="mx-auto">
            <h2 className="text-center">{
                returnChildOfObject(
                    votingSystemObject, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</h2>
            <VoteResults 
                votingSystemObject={votingSystemObject}
                currentVote={currentVote}
            />
            <section className="flex flex-col my-4 justify-center divide-y overflow-scroll">
                {votingSystemArray.map((vote, i) => {
                    if (vote === "locked" || vote === "description") {
                        return null
                    } else {
                        return (
                            <IndividualArchivedVote 
                                key={i}
                                votingSystemObject = {votingSystemObject}
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

export default Vote
