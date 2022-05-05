// Packages
import { useParams } from 'react-router-dom'

const VotingSystem = () => {
    const { id } = useParams()

    return (
        <p>{id}</p>
	)
}

export default VotingSystem
