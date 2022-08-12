// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocumentWithPromise } from '../../../helpers/firestore'
import { getCurrentUser } from '../../../helpers/auth'
// Objects
import { CLOCKEVENTS } from '../../../helpers/emptycampaignitems'

const ClockEventsFields = (props) => {
    const { id, clocks } = props
    const [name, setName] = useState("")
    const [currentClock, setCurrentClock] = useState(clocks[0] ? clocks[0] : "")
    const [userID, setUserID] = useState("")
    const [clockNames, setClockNames] = useState([])
    const [clockIDs, setClockIDs] = useState([])
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        getCurrentUser(setUserID)
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
    }, [userID, clocks, clockIDs, setNotification])

    return (
        <>
            <Name name={name} setName={setName}/>
            <div className="mx-2 py-4 px-2">
                <h4 className="w-40">Associated Clock</h4>
                <h4 className="ml-2 mr-1 inline text-lg font-medium">Clock:</h4>
                <select value={currentClock} onChange={(event) => {
                    setCurrentClock(event.target.value)
                    console.log(event.target.value)
                }}>
                    {
                        clockIDs.map((clock, i) => {
                            return (<option key={i} value={clock}>{clockNames[clock]}</option>)
                        })
                    }
                </select>
            </div>
            <div className="mx-2 py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        const eventsID = uuidv4()
                        let newEvents = CLOCKEVENTS
                        newEvents.name = name
                        newEvents.admins = [userID]
                        newEvents.clock = currentClock
                        getDocument("campaigns", id, setNotification).then((data) => {
                            const campaignData = data.data()
                            let campaign = {...campaignData}
                            campaign.clockevents = [...campaignData.clockevents, eventsID]
                            updateDocumentWithPromise("clockevents", eventsID, newEvents, setNotification).then(() => {
                                updateDocumentWithPromise("campaigns", id, campaign, setNotification).then(() => {
                                    window.location.reload(false)
                                })
                            })
                        })
                    }}
                >
                    Add
                </button>
            </div>
        </>
    )
}

export default ClockEventsFields
