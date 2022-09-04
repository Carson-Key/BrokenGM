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

const ClockSettings = (props) => {
    const { players, id, gm } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockPlayers, setClockPlayers] = useState({...players})
    const [isClocks, setIsClock] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        getDocument("clocks", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            const clockAdminsDB = data.data().admins
            setActivePlayers(clockPlayersDB)
            setAdmins(clockAdminsDB)
            setIsClock(data.exists())
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
        </SettingsBody>
    )
}

export default ClockSettings
