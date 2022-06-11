// Helpers
import { getNumberSuffix, capitalizeFirstLetter } from './misc'
import { fireError, firePing } from './notifications'
import { updateDocumentWithPromise } from './firestore'
// Objects
import { CLOCKEVENTUNITS } from './objects'

export const parseEventString = (eventString) => {
    const timeStamp = eventString.match(/(?<=\[).+?(?=\])/g)[0]
    const description = eventString.match(/(?<=\{).+?(?=\})/g)[0]

    const timeArray = timeStamp.split(":")
    let time = {}
    timeArray.forEach((timeUnit, i) => {
        time[CLOCKEVENTUNITS[i]] = parseInt(timeUnit)
    })

    return {time, description}
}


export const generateClockTimeStamp = (year, yearSuffix, monthName, day, timer) => {
    return (
        (Math.floor((timer / 3600000) % 60)).toString().slice(-2) + ":" +
        ("0" + Math.floor((timer / 60000) % 60)).slice(-2) + " on " +
        capitalizeFirstLetter(monthName) +
        " " + day + getNumberSuffix(day) + " " +
        Math.abs(year).toString() + " " + (yearSuffix)
    )
}
export const generateClockTimeStampWithoutClock = (year, month, day, timer) => {
    return (
        (Math.floor((timer / 3600000) % 60)).toString().slice(-2) + ":" +
        ("0" + Math.floor((timer / 60000) % 60)).slice(-2) + " on " +
        month + "/" + day + "/" + year
    )
}

export const translateTimeStampToMili = (hours, mins) => {
    const hoursToMili = hours * 3600000
    const minsToMili = mins * 60000

    return hoursToMili + minsToMili
}
export const translateInputToFullTimeStamp = (timeStamp, days, months, years) => {
    return ("[" + years + ":" + months + ":" + days + ":" + timeStamp + "]")
}

export const checkInput = (timeNumberArray, timeStringArray, timer, hoursInDay, daysInMonth, monthsInYear, setNotification) => {
    let returnBool = true
    timeNumberArray.forEach((time) => {
        if (isNaN(time)) {
            fireError(setNotification, "Bad User Input", "Illegal character, please only use numbers")
            returnBool = false
        }
    })
    timeStringArray.forEach((time, i) => {
        if (i === (timeStringArray.length - 1)) {
            if (!(/^[-\d]+$/.test(time))) {
                fireError(setNotification, "Bad User Input", "Illegal character, please only use numbers or a dash for negative years")
                returnBool = false
            }
        } else if (!(/^[\d]+$/.test(time))) {
            fireError(setNotification, "Bad User Input", "Illegal character, please only use numbers")
            returnBool = false
        }
    })
    if (hoursInDay) {
        if (timer > (hoursInDay * 3600000)) {
            fireError(setNotification, "Bad User Input", "The HH:MM entered exceed the amount in a day")
            returnBool = false
        }
    }
    if (daysInMonth && monthsInYear) {
        if (timeNumberArray[2] > daysInMonth) {
            fireError(setNotification, "Bad User Input", "The DD (day of month) entered exceeds the amount of days in the month given")
            returnBool = false
        } else if (timeNumberArray[2] < 1) {
            fireError(setNotification, "Bad User Input", "DD (day of month) can not be less than 1")
            returnBool = false
        }
        if (timeNumberArray[3] > monthsInYear) {
            fireError(setNotification, "Bad User Input", "The MM (month of the year in number form) entered exceeds the amount of months in the years")
            returnBool = false
        } else if (timeNumberArray[3] < 0) {
            fireError(setNotification, "Bad User Input", "MM (month of the year in number form) can not be less than 1")
            returnBool = false
        }
    }

    return returnBool
}
export const saveEvent = (
    timer, days, months, years,
    descriptionToAdd, setNotification,
    id, events, setEvents, isClockEvents, hoursInDay, daysInYear, daysInMonths
) => {
    const newEvent = translateInputToFullTimeStamp(timer, days, months, years) + "{" + descriptionToAdd + "}"
    if (hoursInDay && daysInYear && daysInMonths) {
        let tempEvents = [...events, newEvent].sort((a, b) => { 
            const timeA = parseEventString(a).time
            const timeB = parseEventString(b).time
    
            return (
                (
                    (timeA.year * (daysInYear * hoursInDay * 3600000)) +
                    (daysInMonths.slice(0, timeA.month).reduce((a,b)=>a+b,0) * (hoursInDay * 3600000)) +
                    (timeA.day * (hoursInDay * 3600000)) + timeA.timer
                ) - 
                (
                    (timeB.year * (daysInYear * hoursInDay * 3600000)) +
                    (daysInMonths.slice(0, timeB.month).reduce((a,b)=>a+b,0) * (hoursInDay * 3600000)) +
                    (timeB.day * (hoursInDay * 3600000)) + timeB.timer
                )
            )
        } )
        updateDocumentWithPromise(
            "clockevents", id, {events: tempEvents}, 
            setNotification, isClockEvents).then(() => {
                firePing(
                    setNotification, 
                    "Successfull Fire Base Call", 
                    "You have successfully added a new event!"
                )
            })
        setEvents(tempEvents)
    } else {
        let tempEvents = [...events, newEvent]
        updateDocumentWithPromise(
            "clockevents", id, {events: tempEvents}, 
            setNotification, isClockEvents).then(() => {
                firePing(
                    setNotification, 
                    "Successfull Fire Base Call", 
                    "You have successfully added a new event!"
                )
            })
        setEvents(tempEvents)
    }
}
export const deleteEvent = (
    id, indexToRemove, events, setEvents, isClockEvents, setNotification
) => {
    let tempEvents = [...events]
    tempEvents.splice(indexToRemove, 1)
    updateDocumentWithPromise(
        "clockevents", id, {events: tempEvents}, 
        setNotification, isClockEvents).then(() => {
            firePing(
                setNotification, 
                "Successfull FireBase Call", 
                "You have successfully deleted an event!"
            )
        })
    setEvents(tempEvents)
}