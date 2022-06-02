// VotingSystem
import UnLockedVote from './UnLockedVote'
import Vote from './Vote'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { returnChildOfObject } from '../../helpers/misc'

const VoteDecider = (props) => {
    const { votes, currentVote, id, isAdmin, voterKey, setVotes, votingSystemObject, setVotingSystemObject } = props

    return (
        <ConditionalRender
            condition={returnChildOfObject(votes, [currentVote, "locked"], false)}
            returnComponent={
                <UnLockedVote
                    votingSystemObject={votingSystemObject} 
                    setVotingSystemObject={setVotingSystemObject}
                    setVotes={setVotes}
                    votes={votes}
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
