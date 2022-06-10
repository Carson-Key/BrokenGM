// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'

const EventCard = (props) => {
    const { timeStamp, description} = props

    return (
        <Card className="h-80">
            <CardTitle>
                {timeStamp}
            </CardTitle>
            <div className="mx-4 w-72 scrollbar-hide overflow-scroll divide-y">
                {description}
            </div>
        </Card>
	)
}

export default EventCard
