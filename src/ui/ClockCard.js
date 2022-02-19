// Components
import Card from '../components/Card'
import CardTitle from '../components/CardTitle'

const ClockCard = (props) => {
    const { title } = props

    return (
        <Card>
            <CardTitle>
                {title}
            </CardTitle>
            <div className="transition-all duration-500 ease-out scrollbar-hide overflow-scroll">
                test
			</div>
        </Card>
	)
}

export default ClockCard
