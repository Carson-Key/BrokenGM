// Packages
import { useState, useEffect, useContext } from "react"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument } from "../../../helpers/firestore"

const AssociatedEvents = (props) => {
    const { 
        events, selectEvent, currentEvent, setCurrentEvent, afterSelect
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [eventNames, setEventNames] = useState([])
    const [eventIDs, setEventIDs] = useState([])

    useEffect(() => {
        events.forEach((event, i) => {
            getDocument("clockevents", event, setNotification, true).then((data) => {
                if (data !== "permission-denied" && data) {
                    const eventData = data.data()
                    if (eventData) {
                        if (!eventIDs.includes(event)) {
                            setEventIDs(prev => ([...new Set([...prev, event])]))
                            setEventNames(prev => ({...prev, [event]: eventData.name}))
                        }
                    }
                }
            })
        })
    }, [setNotification, events, eventIDs])

    return (
        <div className="ml-2">
            <h4 className="mr-1 inline text-lg font-medium">Clock Events:</h4>
            <select value={currentEvent} onChange={(event) => {
                setCurrentEvent(event.target.value)
                selectEvent(event)
                afterSelect(event.target.value)
            }}>
                <option value={""}>none</option>
                {
                    eventIDs.map((event, i) => {
                        return (<option key={i} value={event}>{eventNames[event]}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default AssociatedEvents
