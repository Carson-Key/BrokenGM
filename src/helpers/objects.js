export const TIMETYPES = {
    mins: "mins",
    hours: "hours",
    days: "days",
    weeks: "weeks",
    months: "months",
    years: "years"
}
export const TIMECONVERSTIONS = {
    mins: [
        {type: TIMETYPES.years, con: 525600}, 
        {type: TIMETYPES.months, con: 43800}, 
        {type: TIMETYPES.weeks, con: 10080}, 
        {type: TIMETYPES.days, con: 1440}, 
        {type: TIMETYPES.hours, con: 60}
    ],
    hours: [
        {type: TIMETYPES.years, con: 8760}, 
        {type: TIMETYPES.months, con: 730}, 
        {type: TIMETYPES.weeks, con: 168}, 
        {type: TIMETYPES.days, con: 24}
    ],
    days: [
        {type: TIMETYPES.years, con: 365}, 
        {type: TIMETYPES.months, con: 30}, 
        {type: TIMETYPES.weeks, con: 7}
    ],
    weeks: [
        {type: TIMETYPES.years, con: 52}, 
        {type: TIMETYPES.months, con: 4}
    ],
    months: [
        {type: TIMETYPES.years, con: 12}
    ],
    years: []
}