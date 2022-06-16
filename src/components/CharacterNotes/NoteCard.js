// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'

const NoteCard = (props) => {
    const { name, isAdmin } = props

    return (
        <Card className="h-80">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="mx-4 w-72 scrollbar-hide overflow-scroll divide-y">
                <ConditionalRender condition={isAdmin}>
                    <></>
                </ConditionalRender>
            </div>
        </Card>
	)
}

export default NoteCard
