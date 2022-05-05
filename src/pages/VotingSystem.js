// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Helpers
import { getRealtimeDB } from '../helpers/database'
import { returnChildOfObject } from '../helpers/misc'

const VotingSystem = () => {
    const { id } = useParams()
    const [votingSystemObject, setVotingSystemObject] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setVotingSystemObject(getRealtimeDB(
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
        <p>{returnChildOfObject(votingSystemObject, ["0", "description"])}</p>
	)
}

export default VotingSystem
