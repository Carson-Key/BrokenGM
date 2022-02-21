// Packages
import { Link } from 'react-router-dom'
// Components
import Card from './Card'
import CardTitle from './CardTitle'

const ClockCard = (props) => {
    const { title, clockID } = props

    return (
        <Link to={"/clock/" + clockID}>
            <Card className="h-fit">
                <CardTitle>
                    {title}
                </CardTitle>
                <div className="my-6 mx-auto w-fit">
                    To Clock
                </div>
            </Card>
        </Link>
	)
}

export default ClockCard
