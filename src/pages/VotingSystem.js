// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import VoteNavigation from '../components/VoteNavigation'
import ConditionalRender from '../components/ConditionalRender'
import VoteDecider from '../components/VoteDecider'
// UI
import Container from '../ui/Container'
// Helpers
import { getRealtimeDBOnce, getRealtimeDB } from '../helpers/database'
import { getCurrentUser } from '../helpers/auth'
import { returnChildOfObject } from '../helpers/misc'

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [votes, setVotes] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currentVote, setCurrentVote] = useState(0)
    const [amountOfVotes, setAmountOfVotes] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [voterKey, setVoterKey] = useState(null)
    const setUID = useState("")[1]

    useEffect(() => {
        setVotingSystemObject(getRealtimeDBOnce(
            "votingsystems/" + id, 
            (data) => {
                if (data) {
                    getCurrentUser(setUID, (uid) => {
                        if (Object.keys(returnChildOfObject(data, ["admins"], {})).includes(uid)) {
                            setIsAdmin(true)
                        } else if (Object.keys(returnChildOfObject(data, ["voters"], {})).includes(uid)) {
                            setVoterKey(returnChildOfObject(data, ["voters", uid], {}))
                        }
                    })
                    setVotingSystemObject(data)
                    setVotes(data.votes)
                    const votesAsArray = Object.keys(data.votes)
                    if (votesAsArray.length > 0) {
                        setCurrentVote(votesAsArray.length - 1)
                        setAmountOfVotes(votesAsArray.length)
                    } else {
                        setAmountOfVotes(0)
                    }
                    getRealtimeDB(
                        "votingsystems/" + id + "/votes/" + votesAsArray.length, 
                        (data) => {
                            if (data) {
                                const newVotes = {...votes, [amountOfVotes]: data}
                                setVotes(newVotes)
                                setVotingSystemObject({...votingSystemObject, votes: newVotes})
                                setCurrentVote(amountOfVotes)
                                setAmountOfVotes(amountOfVotes + 1)
                            }
                        }
                    )
                    setIsLoading(false) 
                }
            }
        ))
    }, [id, amountOfVotes, setUID])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto flex">
                <ConditionalRender
                    condition={amountOfVotes !== 0}
                    returnComponent={<p>There are no votes in this system</p>}
                >
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
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
