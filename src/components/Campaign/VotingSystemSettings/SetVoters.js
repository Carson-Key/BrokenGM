// Packages
import { useEffect, useState, useContext } from "react"
// Contexts
import { NotificationContext } from "../../../contexts/Notification"
// Helpers
import { getDocument } from "../../../helpers/firestore"
import VoterDropdown from "./VoterDropdown"

const SetVoters = (props) => {
    const { 
        defaultVoters, voters,
        votersObject, setVotersObject
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const [players, setPlayers] = useState([])

    useEffect(() => {
        let tempPlayers = []
        voters.forEach(((player, i) => {
            getDocument("users", player, setNotification).then((data)  => {
                tempPlayers.push({name: data.data().displayName, id: player})
                if (tempPlayers.length === voters.length) {
                    setPlayers(tempPlayers)
                }
            })
        }))
    }, [voters, setNotification])

    return (
        <div className="flex flex-wrap flex-col">
            {
                players.map((player, i) => {
                    return (
                        <div key={i} className="w-full py-2 px-2 flex justify-start">
                            <h4>{player.name}: </h4>
                            <VoterDropdown
                                defaultVoters={defaultVoters} 
                                value={votersObject[player.id]} 
                                onChange={(voter) => {
                                    setVotersObject(prev => ({...prev, [player.id]: voter}))
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SetVoters
