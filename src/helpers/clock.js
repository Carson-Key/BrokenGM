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
        const newDayofWeek = ((tempClock.dayOfWeek + 1) + newDays) % tempClock.daysOfWeek.length
        if (newDayofWeek > 0) {
            tempClock.dayOfWeek = newDayofWeek - 1
        }
        tempClock.timer = newTimer
        setTimer(newTimer)
        setClock(tempClock)
    }
}