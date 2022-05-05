// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// Components
import IsLoading from '../components/IsLoading'
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
        console.log(amountOfVotes)
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
            <Container className="mt-auto flex flex-wrap">
                <ConditionalRender
                    condition={amountOfVotes !== 0}
                    returnComponent={<p>There are no votes in this system</p>}
                >
                    <button><MdKeyboardArrowLeft /></button>
                    <Vote 
                        votingSystemObject={votingSystemObject} 
                        currentVote={currentVote}
                    />
                    <button><MdKeyboardArrowRight /></button>
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
