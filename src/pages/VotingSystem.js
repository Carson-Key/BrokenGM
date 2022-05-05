// Packages
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Helpers
import { getRealtimeDB } from '../helpers/database'

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
    useEffect(() => {
        console.log(isLoading)
        console.log(votingSystemObject ? (votingSystemObject["0"] ? votingSystemObject["0"].description : "Loading...") : "Loading...")
    }, [votingSystemObject, isLoading])

    return (
        <p>{votingSystemObject ? (votingSystemObject[0] ? votingSystemObject[0].description : "Loading...") : "Loading..."}</p>
	)
}

export default VotingSystem
