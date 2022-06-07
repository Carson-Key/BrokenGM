// Helpers
import { CONVERSIONS } from './objects.js'

export const tickTimer = (
    id, timer, setTimer, 
    clock, setClock, setNotification, 
    isAdmin, isClock 
) => {
    setTimer(prev => prev + 10)
    if (timer >= (3600000 * clock.hoursInDay)) {
        checkForOverflow(timer, clock, setTimer, setClock)
    }
}

export const addTime = (amount, unit, clock, timer, setTimer, setClock) => {
    const amountOfMilli = CONVERSIONS[unit](
        amount, clock.hoursInDay, 
        clock.daysInMonths, clock.monthOfYear
    )
    let newTimer = timer + amountOfMilli
    if (newTimer >= (3600000 * clock.hoursInDay)) {
        checkForOverflow(newTimer, clock, setTimer, setClock)
    } else {
        setTimer(newTimer)
        setClock(prev => ({...prev, timer: newTimer}))
    }
}
export const subtractTime = (amount, unit, clock, timer, setTimer, setClock) => {
    checkForNegativeOverflow(timer, clock, setTimer, setClock)
}

const checkForOverflow = (timer, clock, setTimer, setClock) => {
    const tempClock = {...clock}
    let newDays = Math.floor(timer / (3600000 * clock.hoursInDay))
    const newTimer = timer - ((3600000 * clock.hoursInDay) * newDays)

    if (newTimer >= 0) {
        let amountOfDays = tempClock.dayOfMonth + newDays
        let breakWhileLoop = false
        const firstMonth = tempClock.monthOfYear
        while(!breakWhileLoop) {
            const nextMonthIndex = 
                (tempClock.monthOfYear + 1 === tempClock.daysInMonths.length) ? 
                    0 : tempClock.monthOfYear + 1
            const tempAmountOfDays = amountOfDays - tempClock.daysInMonths[tempClock.monthOfYear]
            if (newDays < tempClock.daysInMonths[tempClock.monthOfYear]) {
                if (amountOfDays > tempClock.daysInMonths[tempClock.monthOfYear]) {
                    tempClock.dayOfMonth = amountOfDays - tempClock.daysInMonths[tempClock.monthOfYear]
                    tempClock.monthOfYear = tempClock.monthOfYear + 1
                    if (tempClock.monthOfYear === tempClock.daysInMonths.length) {
                        tempClock.monthOfYear = 0
                        tempClock.year = tempClock.year + 1
                    }
                } else {
                    tempClock.dayOfMonth = amountOfDays
                }
                breakWhileLoop = !breakWhileLoop
            } else if (
                tempAmountOfDays >= tempClock.daysInMonths[nextMonthIndex] &&
                tempAmountOfDays <= tempClock.daysInMonths[tempClock.monthOfYear]
            ) {
                newDays = newDays - (tempClock.daysInMonths[firstMonth] - tempClock.daysInMonths[nextMonthIndex])
                tempClock.dayOfMonth = tempClock.daysInMonths[nextMonthIndex]
                tempClock.monthOfYear = tempClock.monthOfYear + 1
                if (tempClock.monthOfYear === tempClock.daysInMonths.length) {
                    tempClock.monthOfYear = 0
                    tempClock.year = tempClock.year + 1
                }
                breakWhileLoop = !breakWhileLoop
            } else if (amountOfDays > tempClock.daysInMonths[tempClock.monthOfYear]) {
                amountOfDays = tempAmountOfDays
                tempClock.monthOfYear = tempClock.monthOfYear + 1
                if (tempClock.monthOfYear === tempClock.daysInMonths.length) {
                    tempClock.monthOfYear = 0
                    tempClock.year = tempClock.year + 1
                }
            } else {
                tempClock.dayOfMonth = amountOfDays
                breakWhileLoop = !breakWhileLoop
            }
        }
        const newDayofWeek = newDays % tempClock.daysOfWeek.length
        tempClock.dayOfWeek = tempClock.dayOfWeek + newDayofWeek
        if (tempClock.dayOfWeek >= tempClock.daysOfWeek.length) {
            tempClock.dayOfWeek = tempClock.dayOfWeek - tempClock.daysOfWeek.length
        }
        tempClock.timer = newTimer
        setTimer(newTimer)
        setClock(tempClock)
    }
}

const checkForNegativeOverflow = (timer, clock, setTimer, setClock) => {
    
}