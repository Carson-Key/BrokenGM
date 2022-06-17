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

const CharacterNotesSettings = (props) => {
    const { players, id } = props
    const setNotification = useContext(NotificationContext)[1]
    const [notesPlayers, setNotesPlayers] = useState({...players})
    const [activePlayers, setActivePlayers] = useState([])
    const [isNotes, setIsNotes] = useState(false)

    useEffect(() => {
        getDocument("characternotes", id, setNotification).then((data)  => {
            const notesPlayersDB = data.data().players
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
        </SettingsBody>
    )
}

export default CharacterNotesSettings
