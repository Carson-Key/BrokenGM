// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "./EditPlayers"
// Contexts
import { NotificationContext } from "../../contexts/Notification"
// Helpers
import { getDocument } from "../../helpers/firestore"

const ClockSettings = (props) => {
    const { players, id } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockPlayers, setClockPlayers] = useState({...players})

    useEffect(() => {
        getDocument("clocks", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {
                tempEnabledPlayers[player] = {id: player, name: players[player].name, access: true}
            })
            
            setClockPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <EditPlayers
            players={clockPlayers}
            toggleAccess={(event, player) => {

            }}
        />
    )
}

export default ClockSettings
