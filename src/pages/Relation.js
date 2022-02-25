// Packages
import { useParams } from 'react-router-dom'
// UI
import Container from "../ui/Container"

const Relation = () => {
    const { id } = useParams()
    
    return (
        <Container className="mt-auto">
            {id}
        </Container>
	)
}

export default Relation
