// Helpers
import { fireError } from "./notifications"

export const generateStatusClasses = (status) => {
    const loweredStatus = status.toLowerCase()
    if (loweredStatus === "alive") {
        return "text-white bg-green-400"
    } else if (loweredStatus === "dead" || loweredStatus === "deceased") {
        return "text-white bg-red-400"
    } else if (loweredStatus === "unknown") {
        return "text-white bg-gray-400"
    } else {
        return "text-white bg-sky-400"
    }
}

const searchWithOperator = (
    name, position, status, tags, 
    searchQuerrys, startingReturnBoolean, onTrueValue
) => {
    let returnBool = startingReturnBoolean

    searchQuerrys.forEach((querry) => {
        const singleQuerryBool = searchWithSingle(
            name, position, status, tags, querry
        )

        if (singleQuerryBool === onTrueValue) {
            returnBool = !startingReturnBoolean
        }
    })

    return returnBool
}
const searchWithSingle = (name, position, status, tags, searchQuerry) => {
    let returnBool = false

    if (searchQuerry.startsWith("!!")) {
        const pureQuerry = searchQuerry.substring(2)
        tags.forEach((tag, i) => {
            const sreachTagBoolean = tag.toLowerCase() === pureQuerry
            if (sreachTagBoolean) {
                returnBool = sreachTagBoolean
            }
        })
    
        return (
            name === pureQuerry ||
            position === pureQuerry ||
            status === pureQuerry || returnBool
        )
    } else {
        tags.forEach((tag, i) => {
            const sreachTagBoolean = tag.toLowerCase().includes(searchQuerry)
            if (sreachTagBoolean) {
                returnBool = sreachTagBoolean
            }
        })
    
        return (
            name.includes(searchQuerry) ||
            position.includes(searchQuerry) ||
            status.includes(searchQuerry) || returnBool
        )
    }
}

export const determinSearchQuerry = (name, position, status, tags, searchQuerry, notification, setNotification) => {
    const loweredName = name.toLowerCase()
    const loweredPosition = position.toLowerCase()
    const loweredStatus = status.toLowerCase()
    const loweredQuerry = searchQuerry.toLowerCase()

    if (loweredQuerry.includes("&&") && !loweredQuerry.includes("||")) {
        return searchWithOperator(
            loweredName, loweredPosition, loweredStatus, tags, 
            loweredQuerry.split(" && "), true, false
        )
    } else if (!loweredQuerry.includes("&&") && loweredQuerry.includes("||")) {
        return searchWithOperator(
            loweredName, loweredPosition, loweredStatus, tags, 
            loweredQuerry.split(" || "), false, true
        )
    } else if (!loweredQuerry.includes("&&") && !loweredQuerry.includes("||")) {
        return searchWithSingle(
            loweredName, loweredPosition, loweredStatus, 
            tags, loweredQuerry
        )
    } else {
        if (!notification.occurs) {
            fireError(setNotification, "Invalid User Input", "Please use only &&'s or ||'s not both")
        }
        return true
    }
}