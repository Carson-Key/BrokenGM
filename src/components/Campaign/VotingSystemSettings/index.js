// Packages
import { useState, useEffect, useContext } from "react"
// VotingSystemSettings
import DefaultVoters from "./DefaultVoters"
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
import { getRealtimeDBOnce, updateRealtimeDB } from "../../../helpers/database"
import { returnChildOfObject, removeElementFromArray } from "../../../helpers/misc"

const VotingSystemSettings = (props) => {
    const { players, id, gm } = props
    const setNotification = useContext(NotificationContext)[1]
    const [votingSystemPlayers, setVotingSystemPlayers] = useState({...players})
    const [isVotingSystem, setIsVotingSystem] = useState(false)
    const [activePlayers, setActivePlayers] = useState([])
    const [defaultVoters, setDefaultVoters] = useState([])
    const [defaultVotersObject, setDefaultVotersObject] = useState({})
    const [voters, setVoters] = useState([])
    const [votersObject, setVotersObject] = useState({})
    const [adminsObject, setAdminsObject] = useState({})
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        getDocument("votingsystems", id, setNotification).then((data)  => {
            const clockPlayersDB = data.data().players
            const clockAdminsDB = data.data().admins
            setActivePlayers(clockPlayersDB)
            setAdmins(clockAdminsDB)
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
                setDefaultVotersObject(data)
            }
        })
        getRealtimeDBOnce("votingsystems/" + id + "/voters", (data) => {
            if (data) {
                setVoters(Object.keys(data))
                setVotersObject(data)
            }
        })
        getRealtimeDBOnce("votingsystems/" + id + "/admins", (data) => {
            if (data) {
                setAdminsObject(data)
            }
        })
    }, [players, id, setNotification])

    return (
        <SettingsBody>
            <SettingsSection>
                <SettingsSectionTitle>Edit Default Voters</SettingsSectionTitle>
                <DefaultVoters
                    id={id} defaultVoters={defaultVoters} 
                    setDefaultVoters={setDefaultVoters}
                    defaultVotersObject={defaultVotersObject} 
                    setDefaultVotersObject={setDefaultVotersObject}
                    afterAddFunc={(formattedName) => {
                        updateRealtimeDB(
                            "", ["votingsystems/" + id + "/defaultVoters/" + formattedName]
                        )
                    }} 
                    afterRemoveFunc={(tempDefaultVotersObject) => {
                        updateRealtimeDB(
                            tempDefaultVotersObject, 
                            ["votingsystems/" + id + "/defaultVoters/"]
                        )
                    }}
                />
            </SettingsSection>
            <SettingsSection>
                <SettingsSectionTitle>Edit Player Access</SettingsSectionTitle>
                <EditPlayers
                    admins={admins}
                    gm={gm}
                    players={votingSystemPlayers}
                    toggleAccess={(event, player) => {
                        const playerObject = votingSystemPlayers[player]
                        if (playerObject.access) {
                            let tempVotersObject = {...votersObject}
                            let tempVoters = removeElementFromArray(voters, player)
                            delete tempVotersObject[player]
                            let tempActivePlayers = [...activePlayers]
                            tempActivePlayers = removeElementFromArray(tempActivePlayers, player)
                            setActivePlayers(tempActivePlayers)
                            setVoters(tempVoters)
                            setVotersObject(tempVotersObject)
                            updateDocument("votingsystems", id, {players: tempActivePlayers}, setNotification, isVotingSystem)
                            updateRealtimeDB(tempVotersObject, ["votingsystems/" + id + "/voters/"])
                        } else {
                            let tempActivePlayers = [...activePlayers, player]
                            let tempVotersObject = {...votersObject, [player]: ""}
                            let tempVoters = [...voters, player]
                            setActivePlayers(tempActivePlayers)
                            setVoters(tempVoters)
                            setVotersObject(tempVotersObject)
                            updateDocument("votingsystems", id, {players: tempActivePlayers}, setNotification, isVotingSystem)
                            updateRealtimeDB(tempVotersObject, ["votingsystems/" + id + "/voters/"])
                        }
                        setVotingSystemPlayers({
                            ...votingSystemPlayers, 
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
                    players={votingSystemPlayers}
                    toggleAccess={(event, player) => {
                        if (admins.includes(player)) {
                            let tempAdminsObject = {...adminsObject}
                            let tempAdmins = [...admins]
                            tempAdmins = removeElementFromArray(tempAdmins, player)
                            setAdmins(tempAdmins)
                            delete tempAdminsObject[player]
                            setAdminsObject(tempAdminsObject)
                            updateDocument("votingsystems", id, {admins: tempAdmins}, setNotification, isVotingSystem)
                            updateRealtimeDB(tempAdminsObject, ["votingsystems/" + id + "/admins/"])
                        } else {
                            let tempAdminsObject = {...adminsObject, [player]: true}
                            let tempAdmins = [...admins, player]
                            setAdmins(tempAdmins)
                            setAdminsObject(tempAdminsObject)
                            updateDocument("votingsystems", id, {admins: tempAdmins}, setNotification, isVotingSystem)
                            updateRealtimeDB(tempAdminsObject, ["votingsystems/" + id + "/admins/"])
                        }
                    }}
                />
            </SettingsSection>
        </SettingsBody>
    )
}

export default VotingSystemSettings
