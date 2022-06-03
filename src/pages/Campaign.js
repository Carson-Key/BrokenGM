// Packages
import { useParams } from 'react-router-dom'
// Components
import Container from '../ui/Container'

const Campaign = () => {
    const { id } = useParams()

    return (
        <Container>
            <p>You are at campaign: {id}</p>
        </Container>
    )
}

export default Campaign
