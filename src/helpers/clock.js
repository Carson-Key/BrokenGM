// Helpers
import { parseEventString } from './clockevents.js'
import { getDocument, updateDocument } from './firestore.js'
import { firePing } from './notifications'
// Objects
import { CONVERSIONS } from './objects.js'

const checkForEvents = (logAccess, events, clock, timer, setNotification, setNewEvents, eventCheck = {}) => {
    if (logAccess) {
        const eventsArray = Object.keys(events)
        const timeString = 
            clock.year + ":" + clock.monthOfYear + ":" + 
            clock.dayOfMonth + ":" + timer
        if (eventsArray.includes(timeString)) {
            events[timeString].forEach((description) => {
                firePing(setNotification, "A Clock Event Has Fired", "An Event Has Happened: " + description)
                setNewEvents(prev => (
                    [...prev, 
                        {
                            description, timer,
                            year: clock.year,
                            month: clock.monthsOfYear[clock.monthOfYear],
                            day: clock.dayOfMonth
                        }
                    ]
                ))
            })
            eventCheck.checked = true
        }
    }
}
const checkForEventsOnAdd = (logAccess, events, clock, timer, setNotification, setNewEvents, eventCheck = {}) => {
    if (logAccess) {
        const CurrentClockMilliseconds = 
            (clock.year * (clock.daysInMonths.reduce((a,b)=>a+b,0) * clock.hoursInDay * 3600000)) +
            (clock.daysInMonths.slice(0, clock.monthOfYear).reduce((a,b)=>a+b,0) * (clock.hoursInDay * 3600000)) +
            (clock.dayOfMonth * (clock.hoursInDay * 3600000)) + timer
        let breakWhileLoop = false
        const eventsArray = Object.keys(events)
        let index = eventsArray.length - 1
        while(!breakWhileLoop) {
            if (eventsArray.length !== 0) {
                const { time } = parseEventString("[" + eventsArray[index] + "]{test}")
                const EventInMiliseconds =             
                    (time.year * (clock.daysInMonths.reduce((a,b)=>a+b,0) * clock.hoursInDay * 3600000)) +
                    (clock.daysInMonths.slice(0, time.month).reduce((a,b)=>a+b,0) * (clock.hoursInDay * 3600000)) +
                    (time.day * (clock.hoursInDay * 3600000)) + time.timer
                if (CurrentClockMilliseconds >= EventInMiliseconds) {
                    console.log(events[eventsArray[index]])
                    events[eventsArray[index]].forEach((description) => {
                        firePing(setNotification, "A Clock Event Has Fired", "An Event Has Happened: " + description)
                        setNewEvents(prev => (
                            [...prev, 
                                {
                                    description, timer: time.timer,
                                    year: clock.year,
                                    month: clock.monthsOfYear[clock.monthOfYear],
                                    day: clock.dayOfMonth
                                }
                            ]
                        ))
                    })
                    index -= 1
                } else {
                    eventCheck.checked = true
                    breakWhileLoop = !breakWhileLoop
                }
            } else {
                breakWhileLoop = !breakWhileLoop
            }
        }
    }
}

export const tickTimer = (
    id, timer, setTimer, 
    clock, setClock, setNotification, 
    isAdmin, isClock, logAccess, events, setNewEvents
) => {
    let eventCheck = {checked: false}
    setTimer(prev => prev + 10)
    if (timer % 60000 === 0) {
        checkForEvents(logAccess, events, clock, timer, setNotification, setNewEvents, eventCheck)
        if (isAdmin) {
            updateDocument(
                "clocks", id, 
                {...clock, timer}, setNotification, isClock)
        } else {
            getDocument("clocks", id, setNotification).then((data) => {
                setClock(data.data())
                setTimer(data.data().timer + 10)
            })
        }
    }
    if (timer >= (3600000 * clock.hoursInDay)) {
        checkForOverflow(timer, clock, setTimer, setClock, id, setNotification, isClock, isAdmin, eventCheck, logAccess, events, setNewEvents, eventCheck)
    }
}

export const addTime = (
    amount, unit, clock, timer, setTimer, setClock, id, setNotification, 
    isClock, isAdmin, logAccess, events, setNewEvents
) => {
    const amountOfMilli = CONVERSIONS[unit](
        amount, clock.hoursInDay, 
        clock.daysInMonths, clock.monthOfYear
    )
    let newTimer = timer + amountOfMilli
    let eventCheck = {checked: false}
    if (newTimer >= (3600000 * clock.hoursInDay)) {
        checkForOverflow(newTimer, clock, setTimer, setClock, id, setNotification, isClock, isAdmin, logAccess, events, setNewEvents, eventCheck)
    } else {
        setTimer(newTimer)
        setClock(prev => ({...prev, timer: newTimer}))
        if (isAdmin) {
            updateDocument(
                "clocks", id, 
                {...clock, timer: newTimer}, setNotification, isClock
            )
        }
        checkForEventsOnAdd(logAccess, events, {...clock, timer: newTimer}, newTimer, setNotification, setNewEvents, eventCheck)
    }
}
export const subtractTime = (
    amount, unit, clock, timer, setTimer, setClock, id, setNotification, 
    isClock, isAdmin, logAccess, events, setNewEvents
) => {
    const amountOfMilli = CONVERSIONS[unit](
        amount, clock.hoursInDay, 
        clock.daysInMonths, clock.monthOfYear
    )
    let newTimer = timer + amountOfMilli
    if (newTimer < 0) {
        checkForNegativeOverflow(
            newTimer, clock, setTimer, setClock, id, setNotification, isClock, isAdmin
        )
    } else {
        setTimer(newTimer)
        setClock(prev => ({...prev, timer: newTimer}))
        if (isAdmin) {
            updateDocument(
                "clocks", id, 
                {...clock, timer: newTimer}, setNotification, isClock
            )
        }
    }
}

const checkForOverflow = (
    timer, clock, setTimer, setClock, id, setNotification, isClock, 
    isAdmin, logAccess, events, setNewEvents, eventCheck = {}
) => {
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
        checkForEventsOnAdd(logAccess, events, {...tempClock, timer: newTimer}, newTimer, setNotification, setNewEvents, eventCheck)
        setTimer(newTimer)
        setClock(tempClock)
        if (isAdmin) {
            updateDocument(
                "clocks", id, 
                tempClock, setNotification, isClock
            )
        }
    }
}

const checkForNegativeOverflow = (timer, clock, setTimer, setClock, id, setNotification, isClock, isAdmin) => {
    const tempClock = {...clock}
    let newDays = Math.floor(timer / (3600000 * clock.hoursInDay))
    const newTimer = timer - ((3600000 * clock.hoursInDay) * newDays)

    if (newTimer >= 0) {
        let amountOfDays = tempClock.dayOfMonth + Math.abs(newDays)
        let breakWhileLoop = false
        const firstMonth = tempClock.monthOfYear
        while(!breakWhileLoop) {
            const nextMonthIndex = 
                (tempClock.monthOfYear - 1 === -1) ? 
                tempClock.daysInMonths.length - 1 : tempClock.monthOfYear - 1
            const tempAmountOfDays = amountOfDays - tempClock.daysInMonths[tempClock.monthOfYear]
            if (Math.abs(newDays) < tempClock.daysInMonths[firstMonth]) {
                if (Math.abs(newDays) >= tempClock.dayOfMonth) {
                    tempClock.dayOfMonth =  tempClock.daysInMonths[nextMonthIndex] - (Math.abs(newDays) - tempClock.dayOfMonth)
                    tempClock.monthOfYear = tempClock.monthOfYear - 1
                    if (tempClock.monthOfYear === -1) {
                        tempClock.monthOfYear = tempClock.daysInMonths.length - 1
                        tempClock.year = tempClock.year - 1
                    }
                } else {
                    tempClock.dayOfMonth = tempClock.dayOfMonth - Math.abs(newDays)
                }
                breakWhileLoop = !breakWhileLoop
            } else if (
                tempAmountOfDays >= tempClock.daysInMonths[nextMonthIndex] &&
                tempAmountOfDays <= tempClock.daysInMonths[tempClock.monthOfYear]
            ) {
                tempClock.dayOfMonth = tempClock.daysInMonths[nextMonthIndex]
                tempClock.monthOfYear = tempClock.monthOfYear - 1
                if (tempClock.monthOfYear === -1) {
                    tempClock.monthOfYear = tempClock.daysInMonths.length - 1
                    tempClock.year = tempClock.year - 1
                }
                breakWhileLoop = !breakWhileLoop
            } else if (amountOfDays > tempClock.daysInMonths[nextMonthIndex]) {
                if (tempAmountOfDays === 0) {
                    breakWhileLoop = !breakWhileLoop
                } else {
                    amountOfDays = tempAmountOfDays
                    tempClock.monthOfYear = tempClock.monthOfYear - 1
                    if (tempClock.monthOfYear === -1) {
                        tempClock.monthOfYear = tempClock.daysInMonths.length - 1
                        tempClock.year = tempClock.year - 1
                    }
                }
            } else {
                if (tempClock.daysInMonths[firstMonth] < tempClock.daysInMonths[tempClock.monthOfYear]) {
                    newDays = newDays - (tempClock.daysInMonths[tempClock.monthOfYear] - amountOfDays)
                } else if (tempClock.daysInMonths[firstMonth] > tempClock.daysInMonths[tempClock.monthOfYear]) {
                    newDays = -1 * tempClock.daysInMonths[tempClock.monthOfYear]
                }
                tempClock.dayOfMonth = amountOfDays
                breakWhileLoop = !breakWhileLoop
            }
        }
        const newDayofWeek = (newDays) % tempClock.daysOfWeek.length
        tempClock.dayOfWeek = tempClock.dayOfWeek + newDayofWeek
        if (tempClock.dayOfWeek < 0) {
            tempClock.dayOfWeek = tempClock.dayOfWeek + tempClock.daysOfWeek.length
        }
        tempClock.timer = newTimer
        setTimer(newTimer)
        setClock(tempClock)
        if (isAdmin) {
            updateDocument(
                "clocks", id, 
                tempClock, setNotification, isClock
            )
        }
    }
}