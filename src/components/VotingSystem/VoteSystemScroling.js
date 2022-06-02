// VotingSystem
import VoteNavigation from './VoteNavigation'
import VoteDecider from './VoteDecider'

const VotingSystemScroling = (props) => {
    const { 
        id, isAdmin, voterKey,
        currentVote, setCurrentVote, 
        amountOfVotes, setAmountOfVotes, 
        votes, setVotes,
        votingSystemObject, setVotingSystemObject
    } = props

    return (
        <VoteNavigation
            id={id}
            currentVote={currentVote} 
            setCurrentVote={setCurrentVote} 
            amountOfVotes={amountOfVotes}
            isAdmin={isAdmin}
            votes={votes} setVotes={setVotes}
            votingSystemObject={votingSystemObject} 
            setVotingSystemObject={setVotingSystemObject}
            setAmountOfVotes={setAmountOfVotes}
        >
            <VoteDecider 
                votingSystemObject={votingSystemObject} 
                setVotingSystemObject={setVotingSystemObject}
                setVotes={setVotes}
                id={id}
                voterKey={voterKey}
                isAdmin={isAdmin}
                votes={votes}
                currentVote={currentVote}
            />
        </VoteNavigation>
	)
}

export default VotingSystemScroling
