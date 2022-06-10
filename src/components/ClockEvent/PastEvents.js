// Packages
import { Fragment } from 'react'
// ClockEvent
import EventCard from './EventCard'
// Helpers
import { parseEventString } from '../../helpers/clockevents'

const PastEvents = (props) => {
    const { events, clockData } = props

    return (
        events.map((event, i) => {
            const { time, description } = parseEventString(event)
            if (clockData) {
                if (
                    time.year > clockData.year || 
                    (
                        time.month > clockData.monthOfYear && 
                        time.year === clockData.year
                    ) || (
                        time.day > clockData.dayOfMonth && 
                        time.month === clockData.monthOfYear && 
                        time.year === clockData.year
                    ) || (
                        time.day > clockData.dayOfMonth && 
                        time.day === clockData.dayOfMonth && 
                        time.month === clockData.monthOfYear && 
                        time.year === clockData.year
                    )
                ) {
                    return <Fragment key={i}></Fragment>
                }
            }
            return (
                <EventCard 
                    key={i}
                    time={time}
                    description={description}
                    clockData={clockData}
                />
            )
        })
	)
}

export default PastEvents
