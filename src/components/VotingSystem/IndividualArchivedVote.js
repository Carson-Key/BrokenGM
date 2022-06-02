// Packages
import { useState } from "react"
// VotingSystem
import IndividualArchivedVoteDecision from "./IndividualTextVoteDecision"
// Helpers
import { returnChildOfObject } from '../../helpers/misc'
import { formatCharacterName } from '../../helpers/voting'

const IndividualArchivedVote = (props) => {
    const { votes, currentVote, vote, className } = props
    const classNameState = useState(className ? "" + className : "")[0]

    return (
        <div className={"text-center py-2 px-4 mx-2" + classNameState}>
            <h3 className="font-bold">
                {formatCharacterName(vote)}
            </h3>
            <IndividualArchivedVoteDecision vote={vote}>
                {formatCharacterName(returnChildOfObject(
                        votes, 
                        [currentVote, vote], 
                        "Loading..."
                    ) ? returnChildOfObject(
                        votes, 
                        [currentVote, vote], 
                        "Loading..."
                    ) : "unknown")}
            </IndividualArchivedVoteDecision>
        </div>
	)
}

export default IndividualArchivedVote
