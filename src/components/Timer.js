// Packages
import { useEffect } from 'react'
// Helpers
import { addMilliSecond } from '../helpers/timer'
import { getNumberSuffix, capitalizeFirstLetter } from '../helpers/misc'

const Timer = (props) => {
    const { 
        timer, 
        setTimer,
        isActive,
        isLoading,
        isClock,
        timerObject,
        setTimerObject
    } = props

    useEffect(() => {
        if (!isLoading) {
            let interval = null
            if (isActive) {
                interval = setInterval(() => {
                    addMilliSecond(timer, setTimer, timerObject, setTimerObject, isClock)
                }, 10)
            } else if (!isActive && timer !== 0) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)
        }
    }, [isActive, timer, setTimer, isLoading, isClock, timerObject, setTimerObject])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <section className="h-full">
                <h1 className="text-6xl w-fit mt-auto mx-auto">
                    {
                        capitalizeFirstLetter(timerObject.daysOfWeek[timerObject.dayOfWeek])
                        
                    }, The {
                        timerObject.dayOfMonth}{getNumberSuffix(timerObject.dayOfMonth)
                    } of {
                        capitalizeFirstLetter(timerObject.monthsOfYear[timerObject.monthOfYear])
                    }, {timerObject.year} {timerObject.yearSuffix}
                </h1>
                <h1 className="text-5xl w-fit mx-auto">
                    {
                        ("0" + Math.floor((timer / 3600000) % 60)).slice(-2) + ":" +
                        ("0" + Math.floor((timer / 60000) % 60)).slice(-2) + ":" +
                        ("0" + Math.floor((timer / 1000) % 60)).slice(-2) + ":" +
                        ("0" + ((timer / 10) % 100)).slice(-2)
                    }
                </h1>
            </section>
        )
    }
}

export default Timer
