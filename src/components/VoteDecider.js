// Components
import ConditionalRender from '../components/ConditionalRender'
import UnLockedVote from '../components/UnLockedVote'
// UI
import Vote from '../ui/Vote'
// Helpers
import { returnChildOfObject } from '../helpers/misc'

const VoteDecider = (props) => {
    const { votes, currentVote, id, isAdmin, voterKey } = props

    return (
        <ConditionalRender
            condition={returnChildOfObject(votes, [currentVote, "locked"], false)}
            returnComponent={
                <UnLockedVote
                    voterKey={voterKey}
                    isAdmin={isAdmin}
                    id={id}
                    currentVote={currentVote}
                />
            }
        >
            <Vote 
                votes={votes}
                currentVote={currentVote}
            />
        </ConditionalRender>
	)
}

export default VoteDecider
