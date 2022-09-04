// Packages
import { useState, useEffect, useContext } from "react"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument } from "../../../helpers/firestore"

const AssociatedClock = (props) => {
    const { 
        clocks, selectEvent, currentClock, setCurrentClock
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockNames, setClockNames] = useState([])
    const [clockIDs, setClockIDs] = useState([])

    useEffect(() => {
        clocks.forEach((clock, i) => {
            getDocument("clocks", clock, setNotification, true).then((data)  => {
                if (data !== "permission-denied" && data) {
                    const clockData = data.data()
                    if (clockData) {
                        if (!clockIDs.includes(clock)) {
                            setClockIDs(prev => ([...new Set([...prev, clock])]))
                            setClockNames(prev => ({...prev, [clock]: clockData.name}))
                        }
                    }
                }
            })
        })
    }, [setNotification, clocks, clockIDs])

    return (
        <div className="ml-2">
            <h4 className="mr-1 inline text-lg font-medium">Clock:</h4>
            <select value={currentClock} onChange={(event) => {
                setCurrentClock(event.target.value)
                selectEvent(event)
            }}>
                <option value={""}>none</option>
                {
                    clockIDs.map((clock, i) => {
                        console.log()
                        return (<option key={i} value={clock}>{clockNames[clock]}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default AssociatedClock
