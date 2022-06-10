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

const Relation = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState([])
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
                setIsLoading(false)
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
                        const timeStamp = event
                        const description = event

                        return (
                            <EventCard 
                                key={i}
                                timeStamp={timeStamp}
                                description={description}
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
