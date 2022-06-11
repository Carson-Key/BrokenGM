// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
import { useEffect } from 'react'

const EventLog = (props) => {
    const { events } = props

    useEffect(() => {
        console.log(events)
    }, [events])

    return (
            <Card className="mt-8 h-96 mx-auto w-5/6">
                <CardTitle>
                    Events This Session
                </CardTitle>
                <ConditionalRender 
                    condition={events.length > 0}
                    returnComponent={
                        <p className="mx-auto my-auto text-3xl font-medium">
                            There have been no events
                        </p>
                    }
                >
                    <p>yes</p>
                </ConditionalRender>
            </Card>
    )
}

export default EventLog
