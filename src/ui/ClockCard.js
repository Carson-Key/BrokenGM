// Components
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import CardTitle from '../components/CardTitle'

const ClockCard = (props) => {
    const { title, clockID } = props

    return (
        <Link to={"clock/" + clockID}>
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
