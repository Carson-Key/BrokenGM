// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// Campaign
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
import AssociatedEvents from '../ClockSettings/AssociatedEvents'
import DaysInWeek from '../ClockSettings/DaysInWeek'
import HoursInDay from '../ClockSettings/HoursInDay'
// AddCampaignItemCard
import Name from './Name'
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocumentWithPromise } from '../../../helpers/firestore'
import { getCurrentUser } from '../../../helpers/auth'
import { fireError } from "../../../helpers/notifications"
// Objects
import { CLOCKS } from '../../../helpers/emptycampaignitems'

const ClockEventsFields = (props) => {
    const { id, events } = props
    const [name, setName] = useState("")
    const [currentEvent, setCurrentEvent] = useState(events[0] ? events[0] : "")
    const [userID, setUserID] = useState("")
    const [hoursInDay, setHoursInDay] = useState(24)
    const [daysInWeek, setDaysInWeek] = useState([])
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        getCurrentUser(setUserID)
    }, [userID])

    return (
        <>
            <SettingsSection>
                <SettingsSectionTitle>Name</SettingsSectionTitle>
                <Name name={name} setName={setName}/>
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Associated Clock Events</SettingsSectionTitle>
                <AssociatedEvents
                    events={events}
                    selectEvent={() => {}}
                    currentEvent={currentEvent}
                    setCurrentEvent={setCurrentEvent}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Hours in Day</SettingsSectionTitle>
                <HoursInDay
                    hoursInDay={hoursInDay} setHoursInDay={setHoursInDay}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Days in Week</SettingsSectionTitle>
                <DaysInWeek
                    daysInWeek={daysInWeek} setDaysInWeek={setDaysInWeek} 
                    afterAddFunc={() => {}} afterRemoveFunc={() => {}}
                    
                />
            </SettingsSection>
            <div className="py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        if (hoursInDay === "") {
                            let errorWithError = ""
                            if (hoursInDay === "") {
                                errorWithError += "Hours in Day "
                            }
                            fireError(setNotification, 1, "Please enter a value for " + errorWithError)
                        } else {
                            const eventsID = uuidv4()
                            let newClock = CLOCKS
                            newClock.name = name
                            newClock.admins = [userID]
                            newClock.clockEvent = currentEvent
                            newClock.daysInWeek = daysInWeek
                            newClock.hoursInDay = hoursInDay
                            getDocument("campaigns", id, setNotification).then((data) => {
                                const campaignData = data.data()
                                let campaign = {...campaignData}
                                campaign.clocks = [...campaignData.clocks, eventsID]
                                updateDocumentWithPromise("clocks", eventsID, newClock, setNotification).then(() => {
                                    updateDocumentWithPromise("campaigns", id, campaign, setNotification).then(() => {
                                        window.location.reload(false)
                                    })
                                })
                            })
                        }
                    }}
                >
                    Add
                </button>
            </div>
        </>
    )
}

export default ClockEventsFields
