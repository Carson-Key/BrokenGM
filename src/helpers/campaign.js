// Helpers
import { getDocument } from "./firestore"

export const getPlayerObject = async (players, setNotification, setPlayers) => {
    let returnObject = {}

    await players.forEach(async (player) => {
        const userdata = await getDocument("users", player, setNotification)
        setPlayers(prev => ({...prev, [player]: {name: userdata.data().displayName, id: player, access: false}}))
    })

    return returnObject
}