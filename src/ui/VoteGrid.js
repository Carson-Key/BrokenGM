// Components
import VoteResults from '../components/VoteResults'
// UI
import IndividualArchivedVote from './IndividualArchivedVote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'

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
        <section className="mx-2 my-2 border-2 py-1 px-2 border-black rounded-lg w-96 h-96">
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
            <section className="grid grid-cols-3 my-4 justify-center scrollbar-hide overflow-scroll">
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

export default VoteGrid
