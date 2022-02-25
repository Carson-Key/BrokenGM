// Packages
import { useParams } from 'react-router-dom'
// UI
import Container from "../ui/Container"

const Relation = () => {
    const { id } = useParams()
    
    return (
        <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
            {id}
        </Container>
	)
}

export default Relation
