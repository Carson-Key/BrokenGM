// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "../EditPlayers"
import EditAdmins from "../EditAdmins"
import SettingsBody from "../SettingsBody"
import SettingsSection from "../SettingsSection"
import SettingsSectionTitle from "../SettingsSectionTitle"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../../helpers/firestore"
import { returnChildOfObject, removeElementFromArray } from "../../../helpers/misc"

const CharacterNotesSettings = (props) => {
    const { players, id, gm } = props
    const setNotification = useContext(NotificationContext)[1]
    const [notesPlayers, setNotesPlayers] = useState({...players})
    const [activePlayers, setActivePlayers] = useState([])
    const [isNotes, setIsNotes] = useState(false)
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        getDocument("characternotes", id, setNotification).then((data)  => {
            const notesPlayersDB = data.data().players
            const clockAdminsDB = data.data().admins
            setAdmins(clockAdminsDB)
            setActivePlayers(notesPlayersDB)
            setIsNotes(data.exists())
            let tempEnabledPlayers = {...players}
            notesPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setNotesPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    gm={gm}
                    admins={admins}
                    players={notesPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = notesPlayers[player]
                        if (playerObject.access) {
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            updateDocument("characternotes", id, {players: tempActivePlayers}, setNotification, isNotes)
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            setActivePlayers(tempActivePlayers)
                            updateDocument("characternotes", id, {players: tempActivePlayers}, setNotification, isNotes)
                        }
                        setNotesPlayers({
                            ...notesPlayers, 
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
                    players={notesPlayers}
                    toggleAccess={(event, player) => {
                        if (admins.includes(player)) {
                            let tempAdmins = [...admins]
                            tempAdmins = removeElementFromArray(tempAdmins, player)
                            setAdmins(tempAdmins)
                            updateDocument("characternotes", id, {admins: tempAdmins}, setNotification, isNotes)
                        } else {
                            let tempAdmins = [...admins, player]
                            setAdmins(tempAdmins)
                            updateDocument("characternotes", id, {admins: tempAdmins}, setNotification, isNotes)
                        }
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default CharacterNotesSettings
