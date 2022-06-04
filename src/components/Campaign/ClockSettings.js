// Packages
import { useState, useEffect, useContext } from "react"
// Campaign
import EditPlayers from "./EditPlayers"
// Contexts
import { NotificationContext } from "../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../helpers/firestore"
import { returnChildOfObject, removeElementFromArray } from "../../helpers/misc"

const ClockSettings = (props) => {
    const { players, id } = props
    const setNotification = useContext(NotificationContext)[1]
    const [clockPlayers, setClockPlayers] = useState({...players})
    const [isClocks, setIsClock] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])

    useEffect(() => {
        getDocument("clocks", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            setActivePlayers(clockPlayersDB)
            setIsClock(data.exists())
            let tempEnabledPlayers = {...players}
            clockPlayersDB.forEach((player) => {    
                tempEnabledPlayers[player] = {id: player, name: returnChildOfObject(players, [player, "name"], ''), access: true}
            })
            
            setClockPlayers(tempEnabledPlayers)
        })
    }, [players, id, setNotification])

    return (
        <div className="px-2 divide-y h-60 overflow-auto scrollbar-hide">
            <div className="py-2">
                <h2 className="text-xl font-semibold">Edit Player Access</h2>
                <EditPlayers
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
            </div>
        </div>
    )
}

export default ClockSettings
