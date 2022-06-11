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

const ClockEventsSettings = (props) => {
    const { players, id, clocks } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockEventsPlayers, setClockEventsPlayers] = useState({...players})
    const [isClockEvents, setIsClockEvents] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [clockNames, setClockNames] = useState([])
    const [clockIDs, setClockIDs] = useState([])

    useEffect(() => {
        getDocument("clockevents", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            setActivePlayers(clockPlayersDB)
            setIsClockEvents(data.exists())
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setClockEventsPlayers(tempEnabledPlayers)
        })
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
    }, [players, id, setNotification, clocks, clockIDs])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Associated Clock</SettingsSectionTitle>
                <h4 className="ml-2 mr-1 inline text-lg font-medium">Clock:</h4>
                <select>
                    {
                        clockIDs.map((clock, i) => {
                            console.log()
                            return (<option key={i} value={clock}>{clockNames[clock]}</option>)
                        })
                    }
                </select>
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
