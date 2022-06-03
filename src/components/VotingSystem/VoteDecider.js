// VotingSystem
import UnLockedVote from './UnLockedVote'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { returnChildOfObject } from '../../helpers/misc'

const VoteDecider = (props) => {
    const { votes, currentVote, id, isAdmin, voterKey, setVotes, votingSystemObject, setVotingSystemObject } = props

    return (
        <ConditionalRender
            condition={returnChildOfObject(votes, [currentVote, "locked"], true)}
        >
            <></>
        </ConditionalRender>
	)
}

export default VoteDecider
