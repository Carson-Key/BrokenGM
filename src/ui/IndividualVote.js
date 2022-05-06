// UI
import IndividualTextVoteDecision from "./IndividualTextVoteDecision"
import IndividualEditVoteDecision from "./IndividualEditVoteDecision"
// Helpers
import { returnChildOfObject } from '../helpers/misc'
import { formatCharacterName } from '../helpers/voting'
import ConditionalRender from "../components/ConditionalRender"

const IndividualVote = (props) => {
    const { votes, vote, voterKey, isAdmin, id, currentVote } = props

    return (
        <div className="text-center py-2 px-4 mx-2">
            <h3 className="font-bold">
                {formatCharacterName(vote)}
            </h3>
            <ConditionalRender
                condition={voterKey === vote || isAdmin}
                returnComponent={
                    <IndividualTextVoteDecision vote={vote}>
                        {formatCharacterName(returnChildOfObject(
                            votes, 
                            [vote], 
                            "Loading..."
                        ) ? returnChildOfObject(
                            votes, 
                            [vote], 
                            "Loading..."
                        ) : "unknown")}
                    </IndividualTextVoteDecision>
                }
            >
                <IndividualEditVoteDecision
                    votes={votes} 
                    vote={vote} 
                    id={id}
                    currentVote={currentVote}
                />
            </ConditionalRender>
        </div>
	)
}

export default IndividualVote
