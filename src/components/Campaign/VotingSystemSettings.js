// Packages
import { useState, useEffect, useContext } from "react"
import { FaTrash } from "react-icons/fa"
import { GrAddCircle } from 'react-icons/gr'
// Campaign
import EditPlayers from "./EditPlayers"
import SettingsBody from "./SettingsBody"
import SettingsSection from "./SettingsSection"
import SettingsSectionTitle from "./SettingsSectionTitle"
// Contexts
import { NotificationContext } from "../../contexts/Notification"
// Helpers
import { getDocument, updateDocument } from "../../helpers/firestore"
import { getRealtimeDBOnce, updateRealtimeDB } from "../../helpers/database"
import { formatCharacterName, reverseFormatCharacterName } from "../../helpers/voting"
import { returnChildOfObject, removeElementFromArray } from "../../helpers/misc"

const VotingSystemSettings = (props) => {
    const { players, id } = props
    const setNotification = useContext(NotificationContext)[1]
    const [votingSystemPlayers, setVotingSystemPlayers] = useState({...players})
    const [isVotingSystem, setIsVotingSystem] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [defaultVoters, setDefaultVoters] = useState([])
    const [newDfaultVoter, setNewDefaultVoter] = useState("")

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
        getRealtimeDBOnce("votingsystems/" + id + "/defaultVoters", (data) => {
            if (data) {
                setDefaultVoters(Object.keys(data))
            }
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Edit Default Voters</SettingsSectionTitle>
                <div className="flex flex-wrap">
                    {
                        defaultVoters.map((voter, i) => {
                            return (
                                <div className={
                                        "w-1/2 py-2 px-2 flex justify-between" +
                                        ((i < defaultVoters.length - 2) ? " border-b" : "") +
                                        ((i % 2 === 0) ? " border-r" : "")
                                    }
                                >
                                    {formatCharacterName(voter)}
                                    <button className="text-red-500">
                                        <FaTrash/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mt-2 mx-auto w-fit h-fit">
                    <input 
                        className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-32 inline"
                        type="text"
                        name="Add Character"
                        placeholder="John Doe"
                        value={newDfaultVoter}
                        onChange={(event) => {
                            setNewDefaultVoter(event.target.value)
                        }}
                    />
                    <button
                        onClick={
                            () => {
                                const formattedName = reverseFormatCharacterName(newDfaultVoter)
                                updateRealtimeDB("", ["votingsystems/" + id + "/defaultVoters/" + formattedName])
                                setNewDefaultVoter("")
                                setDefaultVoters([...defaultVoters, formattedName])
                            }
                        }
                    >
                        <GrAddCircle className="inline h-9 mx-1 mb-1" />
                    </button>
                </div>
            </SettingsSection>
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

export default VotingSystemSettings
