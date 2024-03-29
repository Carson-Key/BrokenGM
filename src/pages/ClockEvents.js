// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
import { PastEvents, AddEventCard, CurrentEvents } from '../components/ClockEvent'
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
    const [eventsDisplayStyle, setEventsDisplayStyle] = useState("new")
    const [activeClass, setActiveClass] = useState({old: "", new: " bg-gray-300"})
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
                        if (data) {
                            if (data.data) {
                                setClockData(data.data())
                            }
                        }
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
                <button className={"rounded-l-lg bg-gray-100 px-3 py-2" + activeClass.new} onClick={() => {
                    setEventsDisplayStyle("new")
                    setActiveClass({old: "", new: " bg-gray-300"})
                }}>
                    <h3>Coming Events</h3>
                </button>
                <button className={"rounded-r-lg bg-gray-100 px-3 py-2" + activeClass.old} onClick={() => {
                    setEventsDisplayStyle("old")
                    setActiveClass({old: " bg-gray-300", new: ""})
                }}>
                    <h3>Past Events</h3>
                </button>
            </div>
            <Container className="flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                <ConditionalRender 
                    condition={eventsDisplayStyle === "old"}
                    returnComponent={
                        <CurrentEvents 
                            events={events} 
                            clockData={clockData} 
                            id={id} 
                            setEvents={setEvents} 
                            isClockEvents={isClockEvents} 
                            isAdmin={isAdmin}
                        />
                    }
                >
                    <PastEvents 
                        events={events} 
                        clockData={clockData} 
                        id={id} 
                        setEvents={setEvents} 
                        isClockEvents={isClockEvents} 
                        isAdmin={isAdmin}
                    />
                </ConditionalRender>
                <ConditionalRender condition={isAdmin}>
                    <AddEventCard
                        id={id}
                        events={events}
                        setEvents={setEvents}
                        isClockEvents={isClockEvents}
                        clockData={clockData}
                    />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default Relation
