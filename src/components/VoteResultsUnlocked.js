// Packages
import { useEffect, useState } from 'react'
// UI
import IndividualArchivedVoteDecision from "../ui/IndividualTextVoteDecision"
// Helpers
import { defaultAccessArray, getHighestValueKey, returnChildOfObject } from '../helpers/misc'
import { formatCharacterName } from '../helpers/voting'

const VoteResultsUnlocked = (props) => {
    const { votes, currentVote } = props
    const [voteResult, setVoteResult] = useState("Unknown")
    const votingSystemArray = Object.keys(votes)

    useEffect(() => {
        let tally = {unknown: 0}
        votingSystemArray.forEach((vote, i) => {
            if (vote === "locked" || vote === "description" || vote === "defaultVoters") {
                // I have no clue why using not equals doesn't work
            } else {
                const talliedVote = returnChildOfObject(
                    votes, 
                    [vote], 
                    0
                )
                tally[talliedVote] = defaultAccessArray(tally, talliedVote, 0) + 1
            }
        })
        const largestVote = getHighestValueKey(tally)
        if (largestVote === "" || largestVote === '') {
            setVoteResult("Unknown")
        } else {
            setVoteResult(largestVote)
        }
        
    }, [votingSystemArray, votes, currentVote])

    return (
        <section className="text-center my-2">
            <h3 className="font-bold">Result</h3>
            <IndividualArchivedVoteDecision
                colors={{
                    yes: "text-white bg-green-700",
                    no: "text-white bg-red-700",
                    none: "text-white bg-gray-700",
                    default: "text-white bg-sky-700"
                }}
            >
                {formatCharacterName(voteResult)}
            </IndividualArchivedVoteDecision>
        </section>
	)
}

export default VoteResultsUnlocked
