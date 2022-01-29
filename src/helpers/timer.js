import { updateDocument } from './firestore'

export const getNumberSuffix = (number) => {
    if (number === 1) {
        return "st"
    } else if (number === 2) {
        return "nd"
    } else if (number === 3) {
        return "rd"
    } else {
        return "th"
    }
}

export const addMilliSecond = (timer, setTimer, isClock = false, ammount = 10) => {
    setTimer(timer => timer + ammount)
    if (timer % 60000 === 0) {
        updateDocument(
            "clocks", 
            "b37722f7-00da-4d7c-b9f5-67325445c313", 
            { timer: timer }, 
            isClock
        )
    }
}

