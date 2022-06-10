// Packages
import { useEffect, useState, useContext } from 'react'
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
            <Container className="flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                {
                    events.map((event, i) => {
                        const { time, description } = parseEventString(event)

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
