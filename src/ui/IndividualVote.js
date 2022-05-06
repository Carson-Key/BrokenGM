// UI
import IndividualArchivedVoteDecision from "./IndividualTextVoteDecision"
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { formatCharacterName } from '../helpers/voting'

const IndividualArchivedVote = (props) => {
    const { votes, vote } = props

    return (
        <div className="text-center py-2 px-4 mx-2">
            <h3 className="font-bold">
                {formatCharacterName(vote)}
            </h3>
            <IndividualArchivedVoteDecision vote={vote}>
                {formatCharacterName(returnChildOfObject(
                    votes, 
                    [vote], 
                    "Loading..."
                ))}
            </IndividualArchivedVoteDecision>
        </div>
	)
}

export default IndividualArchivedVote
