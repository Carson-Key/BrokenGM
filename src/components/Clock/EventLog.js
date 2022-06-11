// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
// Helpers
import { getNumberSuffix, capitalizeFirstLetter } from '../../helpers/misc'

const EventLog = (props) => {
    const { events } = props

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
                    <div className="h-full scrollbar-hide overflow-scroll divide-y my-2">
                        {
                            events.map((event, i) => {
                                return (
                                    <div className="flex w-full justify-center text-lg">
                                        <h4 key={i} className="w-1/4 text-center border-r font-medium">
                                            {
                                                (("0" + Math.floor((event.timer / 3600000) % 60)).slice(-2) + ":" +
                                                ("0" + Math.floor((event.timer / 60000) % 60)).slice(-2)) +
                                                " on the " + event.day + getNumberSuffix(event.day) + " of " + capitalizeFirstLetter(event.month) + " " + event.year
                                            }
                                        </h4>
                                        <p className="w-3/4 mx-2">{event.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ConditionalRender>
            </Card>
    )
}

export default EventLog
