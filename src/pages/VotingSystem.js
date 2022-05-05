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

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [currentVote, setCurrentVote] = useState(0)

    useEffect(() => {
        setVotingSystemObject(getRealtimeDBOnce(
            id + "/votingsystem", 
            (data) => {
                if (data) {
                    setIsLoading(false) 
                    setVotingSystemObject(data)
                    const dataAsArray = Object.keys(data)
                    if (dataAsArray.length > 3) {
                        setCurrentVote(dataAsArray[dataAsArray.length - 4])
                    } else {
                        // there are no votes
                    }
                }
            }
        ))
    }, [id])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto flex flex-wrap">
                <button><MdKeyboardArrowLeft /></button>
                <Vote 
                    votingSystemObject={votingSystemObject} 
                    currentVote={currentVote}
                />
                <button><MdKeyboardArrowRight /></button>
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
