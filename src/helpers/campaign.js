// Helpers
import { getDocument } from "./firestore"

export const getPlayerObject = (players, setNotification) => {
    const returnObject = {}

    players.forEach((player) => {
        getDocument("users", player, setNotification).then((data) => {
            const userData = data.data()
            returnObject[player] = {name: userData.displayName, id: player}
        })
    })

    return returnObject
}