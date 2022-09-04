export const CHARACTERNNOTES = {
    admins: [],
    characters: [],
    name: "",
    players: []
}
export const CLOCKEVENTS = {
    admins: [],
    clock: "",
    events: [],
    name: "",
    players: []
}
export const CLOCKS = {
    admins: [],
    clockEvent: "",
    dayOfMonth: 1,
    dayOfWeek: 0,
    daysInMonths: [],
    daysOfWeek: [],
    hoursInDay: 0,
    isActive: false,
    monthOfYear: 0,
    monthsOfYear: [],
    name: "",
    players: [],
    preYearSuffix: "",
    timer: 0,
    year: 0,
    yearSuffix: ""
}
export const RELATIONS = {
    admins: [],
    name: "",
    npcs: [],
    playerCharacters: [],
    players: []
}
export const VOTINGSYSTEMSFIRESTORE = {
    admins: [],
    name: "",
    players: [],
    "realtime-id": ""
}
export const VOTINGSYSTEMSREALTIME = {
    admins: {},
    defaultVoters: {},
    voters: {},
    votes: {}
}

export const ALLCAMPAIGNITEMS = [
    { name: "Note", emptyObject: CHARACTERNNOTES }, 
    { name: "Clock Event", emptyObject: CLOCKEVENTS },
    { name: "Clock", emptyObject: CLOCKS },
    { name: "Relation", emptyObject: RELATIONS },
    { name: "VotingSystem", emptyObject: VOTINGSYSTEMSFIRESTORE, realTimeEmptyObject: VOTINGSYSTEMSREALTIME },
]