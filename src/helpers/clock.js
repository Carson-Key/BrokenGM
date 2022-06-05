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
    const timerExcess = timer - (3600000 * clock.hoursInDay)
    const tempClock = {...clock}
    if (timerExcess >= 0) {
        tempClock.dayOfMonth = tempClock.dayOfMonth + 1
        tempClock.dayOfWeek = tempClock.dayOfWeek + 1
        if (tempClock.dayOfMonth > tempClock.daysInMonths[tempClock.monthOfYear]) {
            tempClock.monthOfYear = tempClock.monthOfYear + 1
            tempClock.dayOfMonth = 1
            if (tempClock.monthOfYear === tempClock.daysInMonths.length) {
                tempClock.monthOfYear = 0
                tempClock.year = tempClock.year + 1
            }
        }
        if (tempClock.dayOfWeek === tempClock.daysOfWeek.length) {
            tempClock.dayOfWeek = 0
        }
        tempClock.timer = timerExcess
        setTimer(timerExcess)
        setClock(tempClock)
    }
}