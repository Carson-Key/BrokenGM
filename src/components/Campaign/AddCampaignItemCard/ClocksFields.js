// Packages
import { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
// Campaign
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
import AssociatedEvents from '../ClockSettings/AssociatedEvents'
import DaysInWeek from '../ClockSettings/DaysInWeek'
import HoursInDay from '../ClockSettings/HoursInDay'
import Months from '../ClockSettings/Months'
import Years from '../ClockSettings/Years'
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
    const [currentEvent, setCurrentEvent] = useState("")
    const [userID, setUserID] = useState("")
    const [hoursInDay, setHoursInDay] = useState(24)
    const [daysInWeek, setDaysInWeek] = useState([])
    const [monthsOfYear, setMonthsOfYear] = useState([])
    const [daysInMonths, setDaysInMonths] = useState([])
    const setNotification = useContext(NotificationContext)[1]
    const [yearSuffix, setYearSuffix] = useState("")
    const [yearPrefix, setYearPrefix] = useState("")

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
                    afterSelect={() => {}}
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
            <SettingsSection>
                <SettingsSectionTitle>Months</SettingsSectionTitle>
                <Months
                    monthsOfYear={monthsOfYear} setMonthsOfYear={setMonthsOfYear}
                    daysInMonths={daysInMonths} setDaysInMonths={setDaysInMonths}
                    afterAddFunc={() => {}} afterRemoveFunc={() => {}}
                    onChange={() => {}}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Years</SettingsSectionTitle>
                <Years 
                    yearSuffix={yearSuffix} setYearSuffix={setYearSuffix} 
                    yearPrefix={yearPrefix} setYearPrefix={setYearPrefix}
                />
            </SettingsSection>
            <div className="py-4 flex justify-center">
                <button 
                    className="rounded bg-green-400 text-white px-3 py-1"
                    onClick={() => {
                        if (
                            hoursInDay === "" || daysInMonths.includes("") ||
                            daysInMonths.length < 1 || daysInWeek < 1
                        ) {
                            if (hoursInDay === "") {
                                fireError(setNotification, 1, "Please enter a value for Hours in Day")
                            } else if (daysInMonths.includes("")) {
                                fireError(setNotification, 1, "Please enter a value for the amount of days in each month")
                            } else if (daysInMonths.length < 1) {
                                fireError(setNotification, 1, "Please enter at least one month")
                            } else if (daysInWeek < 1) {
                                fireError(setNotification, 1, "Please enter at least one day of week")
                            }
                        } else {
                            const eventsID = uuidv4()
                            let newClock = {...CLOCKS}
                            newClock.name = name
                            newClock.admins = [userID]
                            newClock.clockEvent = currentEvent
                            newClock.daysOfWeek = daysInWeek
                            newClock.hoursInDay = hoursInDay
                            newClock.monthsOfYear = monthsOfYear
                            newClock.daysInMonths = daysInMonths
                            newClock.yearSuffix = yearSuffix
                            newClock.preYearSuffix = yearPrefix
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
