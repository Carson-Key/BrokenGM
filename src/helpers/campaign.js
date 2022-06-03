// Helpers
import { getDocument } from "./firestore"

export const getPlayerObject = (players, setNotification) => {
    let returnObject = {}

    players.forEach((player) => {
        const userdata = getDocument("users", player, setNotification)
        returnObject = {...returnObject, [player]: {name: userdata.displayName, id: player}}
    })

    return returnObject
}