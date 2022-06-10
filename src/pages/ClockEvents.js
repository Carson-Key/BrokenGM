// Packages
import { Fragment, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
import { EventCard, AddEventCard } from '../components/ClockEvent'
// UI
import Container from "../ui/Container"
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'
import { parseEventString } from '../helpers/clockevents'

const Relation = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [eventsDisplayStyle, setEventsDisplayStyle] = useState("new")
    const [clockData, setClockData] = useState(null)
    const [isClockEvents, setIsClockEvents] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        const getClockData = async () => {
            getDocument("clockevents", id, setNotification).then((data) => {
                setEvents(data.data().events)
                setIsClockEvents(data.exists())
                getCurrentUser(setUID, (uid) => {
                    if (data.data().admins.includes(uid)) {
                        setIsAdmin(true)
                    }
                })
                getDocument("clocks", data.data().clock, setNotification, true).then((data) => {
                    if (data === "permission-denied") {
                        setClockData(null)
                    } else {
                        setClockData(data.data())
                    }
                    setIsLoading(false)
                })
            })
        }

        if (isLoading) {
            getClockData()
        }
    }, [id, isLoading, uid, setNotification])

    return (
        <IsLoading isLoading={isLoading}>
            <div className="my-4 divide-x mx-auto">
                <button className="rounded-l-lg bg-gray-100 px-3 py-2" onClick={() => {
                    setEventsDisplayStyle("new")
                }}>
                    <h3>Coming Events</h3>
                </button>
                <button className="rounded-r-lg bg-gray-100 px-3 py-2" onClick={() => {
                    setEventsDisplayStyle("old")
                }}>
                    <h3>Past Events</h3>
                </button>
            </div>
            <button className="w-fit mx-auto text-white bg-green-500 rounded-md px-2 py-1">
                Add New Event
            </button>
            <Container className="flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                {
                    events.map((event, i) => {
                        const { time, description } = parseEventString(event)

                        if (clockData) {
                            if (
                                (time.year >= clockData.year && 
                                time.month >= clockData.monthOfyear &&
                                time.day >= clockData.dayOfMonth) && time.timer > clockData.timer
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
                }
                <ConditionalRender condition={isAdmin}>
                    <AddEventCard
                        id={id}
                        events={events}
                        setEvents={setEvents}
                        isClockEvents={isClockEvents}
                    />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default Relation
