// Packages
import { Link } from 'react-router-dom'
// Components
import Card from './Card'
import CardTitle from './CardTitle'

const GenericLinkCard = (props) => {
    const { title, linkPath, innerText } = props

    return (
        <Link to={linkPath}>
            <Card className="h-fit">
                <CardTitle>
                    {title}
                </CardTitle>
                <div className="my-6 mx-auto w-fit">
                    {innerText}
                </div>
            </Card>
        </Link>
	)
}

export default GenericLinkCard
