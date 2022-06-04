// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "./EditPlayers"
import SettingsBody from "./SettingsBody"
import SettingsSection from "./SettingsSection"
import SettingsSectionTitle from "./SettingsSectionTitle"
// Contexts
import { NotificationContext } from "../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../helpers/firestore"
import { returnChildOfObject, removeElementFromArray } from "../../helpers/misc"

const ClockSettings = (props) => {
    const { players, id } = props
    const setNotification = useContext(NotificationContext)[1]
    const [votingSystemPlayers, setVotingSystemPlayers] = useState({...players})
    const [isVotingSystem, setIsVotingSystem] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])

    useEffect(() => {
        getDocument("votingsystems", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            setActivePlayers(clockPlayersDB)
            setIsVotingSystem(data.exists())
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setVotingSystemPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    players={votingSystemPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = votingSystemPlayers[player]
                        if (playerObject.access) {
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            updateDocument("votingsystems", id, {players: tempActivePlayers}, setNotification, isVotingSystem)
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            setActivePlayers(tempActivePlayers)
                            updateDocument("votingsystems", id, {players: tempActivePlayers}, setNotification, isVotingSystem)
                        }
                        setVotingSystemPlayers({
                            ...votingSystemPlayers, 
                            [player]: {...playerObject, access: !playerObject.access}
                        })
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default ClockSettings
