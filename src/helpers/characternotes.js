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

const searchWithAnds = (name, position, status, tags, searchQuerrys) => {
    let returnBool = true
    searchQuerrys.forEach((querry) => {
        let tagBool
        tags.forEach((tag, i) => {
            const sreachTagBoolean = tag.toLowerCase().includes(querry)
            if (sreachTagBoolean) {
                tagBool = sreachTagBoolean
            }
        })

        const querryBool = 
            name.includes(querry) ||
            position.includes(querry) ||
            status.includes(querry) || tagBool
    
        if (!querryBool && returnBool) {
            returnBool = false
        }
    })

    return returnBool
}
const searchWithOrs = (name, position, status, tags, searchQuerrys) => {
    let returnBool = false
    searchQuerrys.forEach((querry) => {
        if (querry !== "") {
            let tagBool
            tags.forEach((tag, i) => {
                const sreachTagBoolean = tag.toLowerCase().includes(querry)
                if (sreachTagBoolean) {
                    tagBool = sreachTagBoolean
                }
            })
    
            const querryBool = 
                name.includes(querry) ||
                position.includes(querry) ||
                status.includes(querry) || tagBool
        
            if (querryBool && !returnBool) {
                returnBool = true
            }
        }
    })

    return returnBool
}
const searchWithSingle = (name, position, status, tags, searchQuerry) => {
    let returnBool = false

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

export const determinSearchQuerry = (name, position, status, tags, searchQuerry, notification, setNotification) => {
    const loweredName = name.toLowerCase()
    const loweredPosition = position.toLowerCase()
    const loweredStatus = status.toLowerCase()
    const loweredQuerry = searchQuerry.toLowerCase()

    if (loweredQuerry.includes("&&") && !loweredQuerry.includes("||")) {
        return searchWithAnds(loweredName, loweredPosition, loweredStatus, tags, loweredQuerry.split("&&"))
    } else if (!loweredQuerry.includes("&&") && loweredQuerry.includes("||")) {
        return searchWithOrs(loweredName, loweredPosition, loweredStatus, tags, loweredQuerry.split("||"))
    } else if (!loweredQuerry.includes("&&") && !loweredQuerry.includes("||")) {
        return searchWithSingle(loweredName, loweredPosition, loweredStatus, tags, loweredQuerry)
    } else {
        if (!notification.occurs) {
            fireError(setNotification, "Invalid User Input", "Please use only &&'s or ||'s not both")
        }
        return true
    }
}