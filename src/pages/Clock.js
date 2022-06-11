// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import { Timer, Controller, EventLog } from '../components/Clock'
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// UI
import Container from '../ui/Container'
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'
import { parseEventString } from '../helpers/clockevents'

const Clock = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0)
    const [clock, setClock] = useState({})
    const [newEvents, setNewEvents] = useState([])
    const [events, setEvents] = useState({})
    const [isClock, setIsClock] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [logAccess, setLogAccess] = useState(false)
    const [uid, setUID] = useState("")
    const [eventId, setEventId] = useState("")

    useEffect(() => {
        if (isLoading) {
            getDocument("clocks", id, setNotification).then((data) => {
                const tempClock = data.data()
                setTimer(tempClock.timer)
                setClock(tempClock)
                setIsClock(data.exists())
                getCurrentUser(setUID, (uid) => {
                    if (data.data().admins.includes(uid)) {
                        setIsAdmin(true)
                    }
                })
                setEventId(data.data().clockEvent)
                getDocument("clockevents", data.data().clockEvent, setNotification, true).then((data) => {
                    if (data !== "permission-denied") {
                        if (data) {
                            if (data.data()) {
                                let breakWhileLoop = false
                                let eventsDB = data.data().events
                                let index = eventsDB.length - 1
                                let tempEvents = {}
                                while (!breakWhileLoop) {
                                    if (index < 0) {
                                        breakWhileLoop = !breakWhileLoop
                                    } else {
                                        const {time, description} = parseEventString(eventsDB[index])
                                        const timeStamp = eventsDB[index].match(/(?<=\[).+?(?=\])/g)[0]
                                        if (
                                            time.year > tempClock.year || 
                                            (
                                                time.month > tempClock.monthOfYear && 
                                                time.year === tempClock.year
                                            ) || (
                                                time.day > tempClock.dayOfMonth && 
                                                time.month === tempClock.monthOfYear && 
                                                time.year === tempClock.year
                                            ) || (
                                                time.timer > tempClock.timer &&
                                                time.day === tempClock.dayOfMonth && 
                                                time.month === tempClock.monthOfYear && 
                                                time.year === tempClock.year
                                            )
                                        ) {
                                            if (tempEvents[timeStamp]) {
                                                tempEvents[timeStamp] = [...tempEvents[timeStamp], description]
                                            } else {
                                                tempEvents[timeStamp] = [description]
                                            }
                                            index -= 1
                                        } else {
                                            breakWhileLoop = !breakWhileLoop
                                        }
                                    }
                                }
                                setEvents(tempEvents)
                                setLogAccess(true)
                            }
                        }
                    }
                    setIsLoading(false)
                })
            })
        }
    }, [id, isLoading, uid, setNotification, clock, timer])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto">
                <Timer
                    timer={timer}
                    clock={clock}
                />
                <Controller
                    id={id} isAdmin={isAdmin} logAccess={logAccess} 
                    timer={timer} setTimer={setTimer} eventId={eventId}
                    clock={clock} setClock={setClock} isClock={isClock} setEvents={setEvents}
                    events={events} setNewEvents={setNewEvents} newEvents={newEvents}
                />
                <ConditionalRender condition={logAccess}>
                    <EventLog
                        events={newEvents}
                        eventsTwo={events}
                    />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default Clock
