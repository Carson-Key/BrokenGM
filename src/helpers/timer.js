// Helpers
import { updateDocument } from './firestore'
import { defaultAccessArray } from './misc'
// Objects
import { TIMECONVERSTIONS, TIMETYPES, OVERFLOWOBJECT, ADDUNITINMILI } from './objects.js'

export const addUnit = (id, timer, setTimer, timerObject, setTimerObject, type, amount = 1, isClock = false) => {
    const amountInMilliseconds = amount * ADDUNITINMILI[type]
    let newTimerObject = { ...timerObject }

    if (type === TIMETYPES.secs || type === TIMETYPES.mins || type === TIMETYPES.hours) {
        if ((timer + amountInMilliseconds) > 86400000) {
            setTimer(timer => (timer + amountInMilliseconds) - 86400000)
        } else {
            setTimer(timer => timer + amountInMilliseconds)
        }
        checkOverflow(newTimerObject, setTimerObject, amount, type)
    } else {
        checkOverflow(newTimerObject, setTimerObject, amount, type)
    }
    
    updateDocument(
        "clocks", 
        id, 
        newTimerObject, 
        isClock
    )
}
export const addMilliSecond = (id, timer, setTimer, timerObject, setTimerObject, isClock = false, ammount = 10) => {
    setTimer(timer => timer + ammount)
    if (timer % 60000 === 0) {
        updateDocument(
            "clocks", 
            id, 
            { ...timerObject, timer }, 
            isClock
        )
    }
    if (timer > 86400000) {
        checkOverflow(timerObject, setTimerObject, 1, TIMETYPES.hours)
        setTimer(0)
    }
}

const divideToBase = (ammount, type) => {
    let dividedValuesObject = {}
    let tempAmount = ammount
    const converstions = defaultAccessArray(TIMECONVERSTIONS, type, [])

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
export const checkOverflow = (timerObject, setTimerObject, amount, type) => {
    const dividedValuesObject = divideToBase(amount, type)
    const usedTypes = Object.keys(dividedValuesObject)
    const types = [TIMETYPES.hours, TIMETYPES.days, TIMETYPES.weeks, TIMETYPES.months, TIMETYPES.years]

    let returnedObject = { ...timerObject }

    types.forEach((type) => {
        if (usedTypes.includes(type)) {
            OVERFLOWOBJECT[type](
                dividedValuesObject[type], returnedObject
            )
        }
    })

    setTimerObject(returnedObject)
}
export const yearsOverflow = (amount, returnedObject) => {
    returnedObject.year = returnedObject.year + amount
}
export const monthsOverflow = (amount, returnedObject) => {
    const newMonthOfYear = returnedObject.monthOfYear + amount

    if (newMonthOfYear > 11) {
        returnedObject.year = returnedObject.year + 1
        returnedObject.monthOfYear = newMonthOfYear - 12
    } else {
        returnedObject.monthOfYear = newMonthOfYear
    }
}
export const weeksOverflow = (amount, returnedObject) => {
    const newDayOfMonth = returnedObject.dayOfMonth + (amount * 7)
    const daysInCurrentMonth = returnedObject.daysInMonths[returnedObject.monthOfYear]

    if (newDayOfMonth > daysInCurrentMonth) {
        returnedObject.monthOfYear = returnedObject.monthOfYear + 1
        returnedObject.dayOfMonth = newDayOfMonth - daysInCurrentMonth
    } else {
        returnedObject.dayOfMonth = newDayOfMonth
    }
}
export const daysOverflow = (amount, returnedObject) => {
    const newDayOfWeek = returnedObject.dayOfWeek + amount
    const daysInCurrentMonth = returnedObject.daysInMonths[returnedObject.monthOfYear]
    const newDayOfMonth = returnedObject.dayOfMonth + amount

    if (newDayOfWeek > 6) {
        returnedObject.dayOfWeek = newDayOfWeek - 7
    } else {
        returnedObject.dayOfWeek = newDayOfWeek
    }
    if (newDayOfMonth > daysInCurrentMonth) {
        returnedObject.monthOfYear = returnedObject.monthOfYear + 1
        returnedObject.dayOfMonth = newDayOfMonth - daysInCurrentMonth
    } else {
        returnedObject.dayOfMonth = newDayOfMonth
    }
}
export const hoursOverflow = (amount, returnedObject, miliConversion = 3600000) => {
    const newTimerValue = returnedObject.timer + (amount * miliConversion)
    const miliSecondsInDay = 86400000
    
    if (newTimerValue >= miliSecondsInDay) {
        daysOverflow(1, returnedObject)
        returnedObject.timer = newTimerValue - miliSecondsInDay
    } else {
        returnedObject.timer = newTimerValue
    }
}
export const minsOverflow = (amount, returnedObject) => {
    hoursOverflow(amount, returnedObject, 60000)
}