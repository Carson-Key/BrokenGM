// Packages
import { Fragment } from 'react'
// ClockEvent
import EventCard from './EventCard'
// Helpers
import { parseEventString } from '../../helpers/clockevents'

const CurrentEvents = (props) => {
    const { events, clockData, id, setEvents, isClockEvents } = props

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
                    return (
                        <EventCard 
                            key={i}
                            time={time}
                            description={description}
                            clockData={clockData}
                            id={id}
                            i={i}
                            events={events}
                            setEvents={setEvents}
                            isClockEvents={isClockEvents}
                        />
                    )
                } 
            }
            return <Fragment key={i}></Fragment>
        })
	)
}

export default CurrentEvents
