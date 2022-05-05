// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import VoteNavigation from '../components/VoteNavigation'
// UI
import Container from '../ui/Container'
import Vote from '../ui/Vote'
// Helpers
import { getRealtimeDBOnce } from '../helpers/database'
import ConditionalRender from '../components/ConditionalRender';

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currentVote, setCurrentVote] = useState(0)
    const [amountOfVotes, setAmountOfVotes] = useState(0)

    useEffect(() => {
        setVotingSystemObject(getRealtimeDBOnce(
            id + "/votingsystem", 
            (data) => {
                if (data) {
                    setIsLoading(false) 
                    setVotingSystemObject(data)
                    const dataAsArray = Object.keys(data)
                    if (dataAsArray.length > 3) {
                        setCurrentVote(dataAsArray.length - 4)
                        setAmountOfVotes(dataAsArray.length - 3)
                    } else {
                        setAmountOfVotes(0)
                    }
                }
            }
        ))
    }, [id, amountOfVotes])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto flex">
                <ConditionalRender
                    condition={amountOfVotes !== 0}
                    returnComponent={<p>There are no votes in this system</p>}
                >
                    <VoteNavigation
                        currentVote={currentVote} 
                        setCurrentVote={setCurrentVote} 
                        amountOfVotes={amountOfVotes}
                    >
                        <Vote 
                            votingSystemObject={votingSystemObject} 
                            currentVote={currentVote}
                        />
                    </VoteNavigation>
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
