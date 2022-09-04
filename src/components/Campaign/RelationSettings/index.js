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
    const [relationPlayers, setRealtionPlayers] = useState({...players})
    const [isRealion, setIsRealtion] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        getDocument("relations", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            const clockAdminsDB = data.data().admins
            setAdmins(clockAdminsDB)
            setActivePlayers(clockPlayersDB)
            setIsRealtion(data.exists())
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setRealtionPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    gm={gm}
                    admins={admins}
                    players={relationPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = relationPlayers[player]
                        if (playerObject.access) {
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            updateDocument("relations", id, {players: tempActivePlayers}, setNotification, isRealion)
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            setActivePlayers(tempActivePlayers)
                            updateDocument("relations", id, {players: tempActivePlayers}, setNotification, isRealion)
                        }
                        setRealtionPlayers({
                            ...relationPlayers, 
                            [player]: {...playerObject, access: !playerObject.access}
                        })
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default ClockSettings
