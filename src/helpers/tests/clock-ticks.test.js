// Helpers
import { tickTimer } from '../clock.js'

let CLOCK = {}

beforeEach(() => {
    CLOCK = {
        admins: [""],
        dayOfMonth: 1,
        dayOfWeek: 0,
        daysInMonths: [31, 30, 31, 31, 30, 31, 30, 31, 30, 31, 31, 26],
        daysOfWeek: [
            "kursday", "siesday", 
            "vinsday", "prinsday", 
            "magsday", "corsday", 
            "dyrsday"
        ],
        hoursInDay: 24,
        isActive: false,
        monthOfYear: 0,
        monthsOfYear: [
            "solsis", "virsis",
            "bransis", "artsis",
            "tempsis", "clusis",
            "molsis", "lunmon",
            "lemsis", "grivmon",
            "genmon", "azsis"
        ],
        name: "Testing Clock",
        players: [""],
        preYearSuffix: "BRH",
        timer: 0,
        year: 4762,
        yearSuffix: "RH"
    }
    
    return CLOCK
})

describe('Clock Helpers (Ticks)', () => {
    it('Adding a tick', () => {
        let timer = 0
        const setTimer = (newTimer) => {
            timer = newTimer(timer)
        }
        let clock = {}
        const setClock = () => {}
        tickTimer("", timer, setTimer, clock, setClock)
        expect(timer).toBe(10)
    })
	it('Adding a tick with second overflow', () => {
        let timer = 990
        const setTimer = (newTimer) => {
            timer = newTimer(timer)
        }
        let clock = {}
        const setClock = () => {}
        tickTimer("", timer, setTimer, clock, setClock)
        expect(timer).toBe(1000)
    })
	it('Adding a tick with minute overflow', () => {
        let timer = 59990
        const setTimer = (newTimer) => {
            timer = newTimer(timer)
        }
        let clock = {}
        const setClock = () => {}
        tickTimer("", timer, setTimer, clock, setClock)
        expect(timer).toBe(60000)
    })
	it('Adding a tick with hour overflow', () => {
        let timer = 3599990
        const setTimer = (newTimer) => {
            timer = newTimer(timer)
        }
        let clock = {}
        const setClock = () => {}
        tickTimer("", timer, setTimer, clock, setClock)
        expect(timer).toBe(3600000)
    })
	it('Adding a tick with day overflow', () => {
        let timer = 86399990
        const setTimer = (newTimer) => {
            timer = newTimer(timer)
        }
        let clock = {...CLOCK, timer}
        let expectClock = {...CLOCK, dayOfMonth: 2, dayOfWeek: 1, timer: 0}
        const setClock = (newClock) => {
            clock = newClock
        }
        tickTimer("", timer, setTimer, clock, setClock)
        expect(clock).toBe(expectClock)
        expect(timer).toBe(0)
    })
	it('Adding a tick with month overflow', () => {
        let timer = 86399990
        const setTimer = (newTimer) => {
            timer = newTimer
        }
        let clock = {...CLOCK, timer, dayOfMonth: 31}
        let expectClock = {...CLOCK, dayOfMonth: 1, dayOfWeek: 1, timer: 0}
        const setClock = (newClock) => {
            clock = newClock
        }
        tickTimer("", timer, setTimer, clock, setClock)
        expect(clock).toBe(expectClock)
    })
	it('Adding a tick with year overflow', () => {
        let timer = 86399990
        const setTimer = (newTimer) => {
            timer = newTimer
        }
        let clock = {...CLOCK, timer, monthOfYear: 11, dayOfMonth: 26}
        let expectClock = {...CLOCK, 
            monthOfYear: 0, 
            dayOfMonth: 1, 
            dayOfWeek: 1, 
            timer: 0
        }
        const setClock = (newClock) => {
            clock = newClock
        }
        tickTimer("", timer, setTimer, clock, setClock)
        expect(clock).toBe(expectClock)
    })
})