// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "../EditPlayers"
import SettingsBody from "../SettingsBody"
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../../helpers/firestore"
import { returnChildOfObject, removeElementFromArray } from "../../../helpers/misc"
import AssociatedClock from "./AssociatedClock"

const ClockEventsSettings = (props) => {
    const { players, id, clocks } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockEventsPlayers, setClockEventsPlayers] = useState({...players})
    const [isClockEvents, setIsClockEvents] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [currentClock, setCurrentClock] = useState("")

    useEffect(() => {
        getDocument("clockevents", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            setActivePlayers(clockPlayersDB)
            setIsClockEvents(data.exists())
            setCurrentClock(data.data().clock)
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setClockEventsPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification, clocks])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Associated Clock</SettingsSectionTitle>
                <AssociatedClock
                    clocks={clocks}
                    selectEvent={(event) => {
                        updateDocument("clockevents", id, {clock: event.target.value}, setNotification, isClockEvents)
                    }}
                    currentClock={currentClock}
                    setCurrentClock={setCurrentClock}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    players={clockEventsPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = clockEventsPlayers[player]
                        if (playerObject.access) {
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            updateDocument("clockevents", id, {players: tempActivePlayers}, setNotification, isClockEvents)
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            setActivePlayers(tempActivePlayers)
                            updateDocument("clockevents", id, {players: tempActivePlayers}, setNotification, isClockEvents)
                        }
                        setClockEventsPlayers({
                            ...clockEventsPlayers, 
                            [player]: {...playerObject, access: !playerObject.access}
                        })
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default ClockEventsSettings
