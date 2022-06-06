export const tickTimer = (
    id, timer, setTimer, 
    clock, setClock, setNotification, 
    isAdmin, isClock 
) => {
    // setTimer(prev => prev + 10)
    // if (timer >= (3600000 * clock.hoursInDay)) {
    //     checkForOverflow(timer, clock, setTimer, setClock)
    // }
    addTime(1, 'years', clock, timer, setTimer, setClock)
}

const TIMEUNITS = ['mins', 'hours', 'days', 'weeks', 'months', 'years']
const CONVERSIONS = {
    [TIMEUNITS[0]]: (amount) => {return amount * 60000},
    [TIMEUNITS[1]]: (amount) => {return amount * 3600000},
    [TIMEUNITS[2]]: (amount, daysInHours) => {return amount * (3600000 * daysInHours)},
    [TIMEUNITS[3]]: (amount, daysInHours) => {return amount * ((3600000 * daysInHours) * 7)},
    [TIMEUNITS[4]]: (amount, daysInHours, daysInMonths, currentMonth) => {
        let returnValue = 0
        let j = currentMonth
        for (let i = amount; i !== 0; i--) {
            returnValue += ((3600000 * daysInHours) * daysInMonths[j])
            j += 1
            if (j === daysInMonths.length) {
                j = 0
            }
        }
        return returnValue
    },
    [TIMEUNITS[5]]: (amount, daysInHours, daysInMonths) => {
        const daysInYear = daysInMonths.reduce((partialSum, a) => partialSum + a, 0)
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
    const newTimer = timer - ((3600000 * clock.hoursInDay) * newDays) - (timer % (3600000 * clock.hoursInDay))

    if (newTimer >= 0) {
        tempClock.dayOfMonth = tempClock.dayOfMonth + newDays
        let amountOfDays = tempClock.dayOfMonth
        let breakWhileLoop = false
        while(!breakWhileLoop) {
            if (amountOfDays > tempClock.daysInMonths[tempClock.monthOfYear]) {
                amountOfDays = amountOfDays - tempClock.daysInMonths[tempClock.monthOfYear]
                tempClock.monthOfYear = tempClock.monthOfYear + 1
                if (tempClock.monthOfYear === tempClock.daysInMonths.length) {
                    tempClock.monthOfYear = 0
                    tempClock.year = tempClock.year + 1
                }
            } else {
                breakWhileLoop = !breakWhileLoop
                tempClock.dayOfMonth = amountOfDays
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