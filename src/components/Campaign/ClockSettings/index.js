// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "../EditPlayers"
import EditAdmins from "../EditAdmins"
import SettingsBody from "../SettingsBody"
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
import AssociatedEvents from "./AssociatedEvents"
import HoursInDay from "./HoursInDay"
import DaysInWeek from "./DaysInWeek"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../../helpers/firestore"
import { returnChildOfObject, removeElementFromArray } from "../../../helpers/misc"
import { firePing } from "../../../helpers/notifications"

const ClockSettings = (props) => {
    const { players, id, gm, events } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockPlayers, setClockPlayers] = useState({...players})
    const [isClocks, setIsClock] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [admins, setAdmins] = useState([])
    const [hoursInDay, setHoursInDay] = useState(0)
    const [currentEvent, setCurrentEvent] = useState("")
    const [daysInWeek, setDaysInWeek] = useState([])

    useEffect(() => {
        getDocument("clocks", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            const clockAdminsDB = data.data().admins
            setActivePlayers(clockPlayersDB)
            setAdmins(clockAdminsDB)
            setDaysInWeek(data.data().daysOfWeek)
            setCurrentEvent(data.data().clockEvent)
            setIsClock(data.exists())
            setHoursInDay(data.data().hoursInDay)
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setClockPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Associated Clock Events</SettingsSectionTitle>
                <AssociatedEvents
                    events={events}
                    selectEvent={() => {}}
                    currentEvent={currentEvent}
                    setCurrentEvent={setCurrentEvent}
                    afterSelect={(eventID) => {
                        updateDocument("clocks", id, {clockEvent: eventID}, setNotification, isClocks)
                    }}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Hours in Day</SettingsSectionTitle>
                <HoursInDay 
                    hoursInDay={hoursInDay}
                    setHoursInDay={setHoursInDay}
                />
                <button 
                    className="px-2 py-1 ml-4 text-white rounded bg-green-400"
                    onClick={() => {
                        updateDocument("clocks", id, {hoursInDay: hoursInDay}, setNotification, isClocks)
                        firePing(setNotification, 0, "You have successfully updated hours in a day")
                    }}
                >
                    Update
                </button>
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Days in Week</SettingsSectionTitle>
                <DaysInWeek
                    daysInWeek={daysInWeek} setDaysInWeek={setDaysInWeek} 
                    afterAddFunc={(newDaysInWeek) => {
                        updateDocument("clocks", id, {daysOfWeek: newDaysInWeek}, setNotification, isClocks)
                    }} 
                    afterRemoveFunc={(newDaysInWeek) => {
                        updateDocument("clocks", id, {daysOfWeek: newDaysInWeek}, setNotification, isClocks)
                    }}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    gm={gm}
                    admins={admins}
                    players={clockPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = clockPlayers[player]
                        if (playerObject.access) {
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            updateDocument("clocks", id, {players: tempActivePlayers}, setNotification, isClocks)
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            setActivePlayers(tempActivePlayers)
                            updateDocument("clocks", id, {players: tempActivePlayers}, setNotification, isClocks)
                        }
                        setClockPlayers({
                            ...clockPlayers, 
                            [player]: {...playerObject, access: !playerObject.access}
                        })
                    }}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Edit Admin Access</SettingsSectionTitle>
                <EditAdmins
                    admins={admins}
                    gm={gm}
                    players={clockPlayers}
                    toggleAccess={(event, player) => {
                        if (admins.includes(player)) {
                            let tempAdmins = [...admins]
                            tempAdmins = removeElementFromArray(tempAdmins, player)
                            setAdmins(tempAdmins)
                            updateDocument("clocks", id, {admins: tempAdmins}, setNotification, isClocks)
                        } else {
                            let tempAdmins = [...admins, player]
                            setAdmins(tempAdmins)
                            updateDocument("clocks", id, {admins: tempAdmins}, setNotification, isClocks)
                        }
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default ClockSettings
