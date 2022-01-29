// Helpers
import { updateDocument } from './firestore'
// Objects
import { TIMECONVERSTIONS } from './objects.js'

export const addHour = (timer, setTimer, timerObject, isClock = false, ammount = 1) => {
    const amountInMilliseconds = ammount * 3600000
    setTimer(timer => timer + amountInMilliseconds)
    
    updateDocument(
        "clocks", 
        "b37722f7-00da-4d7c-b9f5-67325445c313", 
        { ...timerObject, timer }, 
        isClock
    )
}
export const addMinute = (timer, setTimer, timerObject, isClock = false, ammount = 1) => {
    const amountInMilliseconds = ammount * 60000
    setTimer(timer => timer + amountInMilliseconds)
    
    updateDocument(
        "clocks", 
        "b37722f7-00da-4d7c-b9f5-67325445c313", 
        { ...timerObject, timer }, 
        isClock
    )
}
export const addSecond = (timer, setTimer, timerObject, isClock = false, ammount = 1) => {
    const amountInMilliseconds = ammount * 1000
    setTimer(timer => timer + amountInMilliseconds)
    
    updateDocument(
        "clocks", 
        "b37722f7-00da-4d7c-b9f5-67325445c313", 
        { ...timerObject, timer }, 
        isClock
    )
}
export const addMilliSecond = (timer, setTimer, timerObject, setTimerObject, isClock = false, ammount = 10) => {
    setTimer(timer => timer + ammount)
    if (timer % 60000 === 0) {
        updateDocument(
            "clocks", 
            "b37722f7-00da-4d7c-b9f5-67325445c313", 
            { ...timerObject, timer }, 
            isClock
        )
    }
}

export const divideToBase = (ammount, type) => {
    let dividedValuesObject = {}
    let tempAmount = ammount
    const converstions = TIMECONVERSTIONS[type]

    converstions.forEach((conversion) => {
        if (tempAmount/conversion.con >= 1) {
            const amountOfUnit = Math.floor(tempAmount / conversion.con)
            dividedValuesObject[conversion.type] = amountOfUnit
            tempAmount = tempAmount - (amountOfUnit * conversion.con)
        }
    })

    dividedValuesObject[type] = tempAmount
    return dividedValuesObject
}