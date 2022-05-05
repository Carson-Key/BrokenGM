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
            <p className="text-center">{
                returnChildOfObject(
                    votingSystemObject, 
                    [currentVote, "description"], 
                    "Loading..."
                )
            }</p>
            <section className="flex flex-col my-4 justify-center divide-y">
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
