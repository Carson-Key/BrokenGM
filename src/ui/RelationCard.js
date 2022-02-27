// Components
import Card from './Card'
import CardTitle from './CardTitle'

const RelationCard = (props) => {
    const { name, innerText } = props

    return (
        <Card className="h-fit">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="my-6 mx-auto w-fit">
                {innerText}
            </div>
        </Card>
	)
}

export default RelationCard
