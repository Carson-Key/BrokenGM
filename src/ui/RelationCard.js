// Packages
import { Link } from 'react-router-dom'
// Components
import Card from './Card'
import CardTitle from './CardTitle'

const RelationCard = (props) => {
    const { title, relationID } = props

    return (
        <Link to={"/relation/" + relationID}>
            <Card className="h-fit">
                <CardTitle>
                    {title}
                </CardTitle>
                <div className="my-6 mx-auto w-fit">
                    To Relation
                </div>
            </Card>
        </Link>
	)
}

export default RelationCard
