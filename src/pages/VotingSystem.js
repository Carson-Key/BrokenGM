// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
// UI
import Container from '../ui/Container'
import Vote from '../ui/Vote'
// Helpers
import { getRealtimeDBOnce } from '../helpers/database'
import { returnChildOfObject } from '../helpers/misc'

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setVotingSystemObject(getRealtimeDBOnce(
            id + "/votingsystem", 
            (data) => {
                if (data) {
                    setIsLoading(false) 
                    setVotingSystemObject(data)
                }
            }
        ))
    }, [id])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto flex flex-wrap">
                <Vote votingSystemObject={votingSystemObject} />
            </Container>
        </IsLoading>
	)
}

export default VotingSystem
