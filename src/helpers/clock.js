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

const TIMEUNITS = ['mins', 'hours', 'days', 'weeks', 'months', 'years']
const CONVERSIONS = {
    [TIMEUNITS[0]]: (amount) => {return amount * 60000},
    [TIMEUNITS[1]]: (amount) => {return amount * 3600000},
    [TIMEUNITS[2]]: (amount, daysInHours) => {return amount * (3600000 * daysInHours)},
    [TIMEUNITS[3]]: (amount, daysInHours) => {return amount * ((3600000 * daysInHours) * 7)},
    [TIMEUNITS[4]]: (amount, daysInHours, daysInMonths, currentMonth) => {
        let returnValue = 0
        let j = (currentMonth + 1 === daysInMonths.length) ? 
        0 : currentMonth + 1
        for (let i = amount; i !== 0; i--) {
            returnValue += ((3600000 * daysInHours) * daysInMonths[j])
            j = j + 1
            if (j === daysInMonths.length) {
                j = 0
            }
        }
        return returnValue
    },
    [TIMEUNITS[5]]: (amount, daysInHours, daysInMonths) => {
        const daysInYear = daysInMonths.reduce((partialSum, a) => partialSum + a, 0)
        console.log(daysInYear)
        return amount * ((3600000 * daysInHours) * daysInYear)
    },
}

const addTime = (amount, unit, clock, timer, setTimer, setClock) => {
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

const checkForOverflow = (timer, clock, setTimer, setClock) => {
    const tempClock = {...clock}
    let newDays = Math.floor(timer / (3600000 * clock.hoursInDay))
    const newTimer = timer - ((3600000 * clock.hoursInDay) * newDays)

    if (newTimer >= 0) {
        let amountOfDays = tempClock.dayOfMonth + newDays
        let breakWhileLoop = false
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
                breakWhileLoop = !breakWhileLoop
            }
        }
        const newDayofWeek = newDays % tempClock.daysOfWeek.length
        console.log(newDays)
        tempClock.dayOfWeek = tempClock.dayOfWeek + newDayofWeek
        if (tempClock.dayOfWeek >= tempClock.daysOfWeek.length) {
            tempClock.dayOfWeek = tempClock.dayOfWeek - tempClock.daysOfWeek.length
        }
        tempClock.timer = newTimer
        setTimer(newTimer)
        setClock(tempClock)
    }
}