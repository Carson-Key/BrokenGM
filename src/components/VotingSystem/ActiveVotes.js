// Packages
import { useEffect } from 'react'
// VotingSystem
import VoteNavigation from './VoteNavigation'
import UnLockedVote from './UnLockedVote'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { returnArrayOfActiveVotes } from '../../helpers/voting'

const ActiveVotes = (props) => {
    const { 
        id, isAdmin, voterKey,
        currentVote, setCurrentVote, 
        setActiveVotes, setAmountOfActiveVotes, setActiveVoteIndexes,
        activeVotes, activeVoteIndexes, amountOfActiveVotes, 
        votes, votingSystemObject, setVotingSystemObject
    } = props

    useEffect(() => {
        const [tempActiveVotes, tempActiveVoteIndexes] = returnArrayOfActiveVotes(votes)
        setActiveVotes(tempActiveVotes)
        setAmountOfActiveVotes(tempActiveVotes.length)
        setActiveVoteIndexes(tempActiveVoteIndexes)
        setCurrentVote(tempActiveVoteIndexes[0])
    }, [votes, amountOfActiveVotes, setCurrentVote, setActiveVotes, setAmountOfActiveVotes, setActiveVoteIndexes])

    return (
        <ConditionalRender
            condition={amountOfActiveVotes !== 0}
            returnComponent={
                <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">There are no Active Votes</h2>
            }
        >
            <VoteNavigation
                setCurrentVote={setCurrentVote}
                activeVoteIndexes={activeVoteIndexes}
            >
                <UnLockedVote
                    votingSystemObject={votingSystemObject} 
                    setVotingSystemObject={setVotingSystemObject}
                    setVotes={setActiveVotes}
                    votes={activeVotes}
                    voterKey={voterKey}
                    isAdmin={isAdmin}
                    id={id}
                    currentVote={currentVote}
                />
            </VoteNavigation>
        </ConditionalRender>
	)
}

export default ActiveVotes
