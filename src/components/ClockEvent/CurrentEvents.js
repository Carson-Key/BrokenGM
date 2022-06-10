// Packages
import { Fragment } from 'react'
// ClockEvent
import EventCard from './EventCard'
// Helpers
import { parseEventString } from '../../helpers/clockevents'

const CurrentEvents = (props) => {
    const { events, clockData } = props

    return (
        events.map((event, i) => {
            const { time, description } = parseEventString(event)
            if (clockData) {
                if (
                    (
                        time.year > clockData.year || 
                        time.month > clockData.monthOfYear ||
                        time.day > clockData.dayOfMonth
                    ) || (
                        time.year === clockData.year && 
                        time.month === clockData.monthOfYear &&
                        time.day === clockData.dayOfMonth && 
                        time.timer > clockData.timer
                    )
                ) {
                    return (
                        <EventCard 
                            key={i}
                            time={time}
                            description={description}
                            clockData={clockData}
                        />
                    )
                }
            }
            return <Fragment key={i}></Fragment>
        })
	)
}

export default CurrentEvents
