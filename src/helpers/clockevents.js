// Helpers
import { getNumberSuffix, capitalizeFirstLetter } from './misc'
import { fireError } from './notifications'
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

export const checkInput = (timeNumberArray, timeStringArray, setNotification) => {
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
                fireError(setNotification, "Bad User Input", "Illegal character, please only use numbers")
                returnBool = false
            }
        } else if (!(/^[\d]+$/.test(time))) {
            fireError(setNotification, "Bad User Input", "Illegal character, please only use numbers")
            returnBool = false
        }
    })
    return returnBool
}
export const saveEvent = (
    timeToAdd, descriptionToAdd, setNotification,
    id, events, setEvents, isClockEvents
) => {

}