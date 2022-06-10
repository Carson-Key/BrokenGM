// Helpers
import { getNumberSuffix, capitalizeFirstLetter } from './misc'
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