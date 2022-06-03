// Packages
import { useEffect, useState } from 'react'
// VotingSystem
import VoteNavigation from './VoteNavigation'
import UnLockedVote from './UnLockedVote'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { returnArrayOfActiveVotes } from '../../helpers/voting'
import { updateRealtimeDB } from '../../helpers/database'
import { returnChildOfObject } from '../../helpers/misc'

const ActiveVotes = (props) => {
    const { 
        id, isAdmin, voterKey,
        currentVote, setCurrentVote, 
        amountOfVotes, setAmountOfVotes, 
        votes, setVotes,
        votingSystemObject, setVotingSystemObject
    } = props
    const [activeVotes, setActiveVotes] = useState([])
    const [amountOfActiveVotes, setAmountOfActiveVotes] = useState(0)
    const [activeVoteIndexes, setActiveVoteIndexes] = useState(0)

    useEffect(() => {
        const [tempActiveVotes, tempActiveVoteIndexes] = returnArrayOfActiveVotes(votes)
        setActiveVotes(tempActiveVotes)
        setAmountOfActiveVotes(tempActiveVotes.length)
        setActiveVoteIndexes(tempActiveVoteIndexes)
        setCurrentVote(tempActiveVoteIndexes[0])
    }, [votes, amountOfActiveVotes, setCurrentVote])

    return (
        <>
            <ConditionalRender condition={isAdmin}>
                <button className="text-center mb-3 w-full" onClick={() => {
                    const newData = {
                        description: "",
                        locked: false,
                        ...returnChildOfObject(
                            votingSystemObject, 
                            ["defaultVoters"], 
                            {}
                        )
                    }
                    const newVotes = {
                        ...votes,
                        [amountOfVotes]: newData
                    }
                    const newVotesArray = [
                        ...votes,
                        newData
                    ]
                    setVotingSystemObject({
                        ...votingSystemObject, 
                        votes: newVotes
                    })
                    setVotes(newVotes)
                    setAmountOfVotes(amountOfVotes + 1)
                    const [tempActiveVotes, tempActiveVoteIndexes] = returnArrayOfActiveVotes(newVotesArray)
                    setActiveVotes(tempActiveVotes)
                    setAmountOfActiveVotes(tempActiveVotes.length)
                    setActiveVoteIndexes(tempActiveVoteIndexes)
                    updateRealtimeDB(newData, ["votingsystems/" + id + "/votes/" + amountOfVotes + "/"])
                }}><p className="w-fit mx-auto text-white bg-green-500 rounded-md px-2 py-1">
                    Add New Vote
                </p></button>
            </ConditionalRender>
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
        </>
	)
}

export default ActiveVotes
