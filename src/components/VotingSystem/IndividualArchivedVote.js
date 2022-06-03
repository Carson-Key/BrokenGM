// Packages
import { useState } from "react"
// VotingSystem
import IndividualTextVoteDecision from "./IndividualTextVoteDecision"
// Helpers
import { returnChildOfObject } from '../../helpers/misc'
import { formatCharacterName } from '../../helpers/voting'

const IndividualArchivedVote = (props) => {
    const { votes, currentVote, vote, className } = props
    const classNameState = useState(className ? " " + className : "")[0]

    return (
        <div className={"text-center py-2 px-4 mx-2" + classNameState}>
            <h3 className="w-max mx-auto font-bold">
                {formatCharacterName(vote)}
            </h3>
            <IndividualTextVoteDecision vote={vote}>
                {formatCharacterName(returnChildOfObject(
                        votes, 
                        [currentVote, vote], 
                        "Loading..."
                    ) ? returnChildOfObject(
                        votes, 
                        [currentVote, vote], 
                        "Loading..."
                    ) : "unknown")}
            </IndividualTextVoteDecision>
        </div>
	)
}

export default IndividualArchivedVote
