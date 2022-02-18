import { 
    yearsOverflow,
    monthsOverflow,
    weeksOverflow,
    daysOverflow,
    hoursOverflow,
    minsOverflow
 } from './timer'

export const TIMETYPES = {
    mils: "mils",
    secs: "secs",
    mins: "mins",
    hours: "hours",
    days: "days",
    weeks: "weeks",
    months: "months",
    years: "years"
}
export const TIMENAMESANDTYPES = {
    mils: {
        name: "Miliseconds",
        type: TIMETYPES.mils
    },
    secs: {
        name: "Seconds",
        type: TIMETYPES.secs
    },
    mins: {
        name: "Minutes",
        type: TIMETYPES.mins
    },
    hours: {
        name: "Hours",
        type: TIMETYPES.hours
    },
    days: {
        name: "Days",
        type: TIMETYPES.days
    },
    weeks: {
        name: "Weeks",
        type: TIMETYPES.weeks
    },
    months: {
        name: "Months",
        type: TIMETYPES.months
    },
    years: {
        name: "Years",
        type: TIMETYPES.years
    }
}
export const TIMECONVERSTIONS = {
    [TIMETYPES.mins]: [
        {type: TIMETYPES.years, con: 525600}, 
        {type: TIMETYPES.months, con: 43800}, 
        {type: TIMETYPES.weeks, con: 10080}, 
        {type: TIMETYPES.days, con: 1440}, 
        {type: TIMETYPES.hours, con: 60}
    ],
    [TIMETYPES.hours]: [
        {type: TIMETYPES.years, con: 8760}, 
        {type: TIMETYPES.months, con: 730}, 
        {type: TIMETYPES.weeks, con: 168}, 
        {type: TIMETYPES.days, con: 24}
    ],
    [TIMETYPES.days]: [
        {type: TIMETYPES.years, con: 365}, 
        {type: TIMETYPES.months, con: 30}, 
        {type: TIMETYPES.weeks, con: 7}
    ],
    [TIMETYPES.weeks]: [
        {type: TIMETYPES.years, con: 52}, 
        {type: TIMETYPES.months, con: 4}
    ],
    [TIMETYPES.months]: [
        {type: TIMETYPES.years, con: 12}
    ],
    [TIMETYPES.years]: []
}
export const OVERFLOWOBJECT = {
    [TIMETYPES.mins]: (amount, returnedObject) => {minsOverflow(amount, returnedObject)},
    [TIMETYPES.hours]: (amount, returnedObject) => {hoursOverflow(amount, returnedObject)},
    [TIMETYPES.days]: (amount, returnedObject) => {daysOverflow(amount, returnedObject)},
    [TIMETYPES.weeks]: (amount, returnedObject) => {weeksOverflow(amount, returnedObject)},
    [TIMETYPES.months]: (amount, returnedObject) => {monthsOverflow(amount, returnedObject)},
    [TIMETYPES.years]: (amount, returnedObject) => {yearsOverflow(amount, returnedObject)}
}
export const ADDUNITINMILI = {
    [TIMETYPES.secs]: 1000,
    [TIMETYPES.mins]: 60000,
    [TIMETYPES.hours]: 3600000,
    [TIMETYPES.days]: 1,
    [TIMETYPES.weeks]: 1,
    [TIMETYPES.months]: 1,
    [TIMETYPES.years]: 1
}