import { TIMETYPES } from "../helpers/objects"
import { addUnit } from "../helpers/timer"

const TimerController = (props) => {
    const { 
        isLoading, isClock,
        isActive, setIsActive,
        timer, setTimer, 
        timerObject, setTimerObject, 
    } = props

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
            <div>
                <input type="text" name="Change Clock" placeholder="+/- Time"/>
                <button 
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.mins, 1, isClock
                        )}
                    }
                >
                    Minutes
                </button>
                <button
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.hours, 1, isClock
                        )}
                    }
                >
                    Hours
                </button>
                <button
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.days, 1, isClock
                        )}
                    }
                >
                    Days
                </button>
                <button
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.weeks, 1, isClock
                        )}
                    }
                >
                    Weeks
                </button>
                <button
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.months, 1, isClock
                        )}
                    }
                >
                    Months
                </button>
                <button
                    disabled={isLoading} 
                    onClick={() => {
                        addUnit(
                            timer, setTimer, 
                            timerObject, setTimerObject, 
                            TIMETYPES.years, 1, isClock
                        )}
                    }
                >
                    Years
                </button>
            </div>
        </>
	)
}

export default TimerController
