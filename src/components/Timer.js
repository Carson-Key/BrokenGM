// Packages
import { useEffect, useContext } from 'react'
// Contexts
import { NotificationContext } from '../contexts/Notification'
// Helpers
import { addMilliSecond } from '../helpers/timer'
import { getNumberSuffix, capitalizeFirstLetter } from '../helpers/misc'

const Timer = (props) => {
    const { 
        id,
        timer, 
        setTimer,
        isActive,
        isLoading,
        isClock,
        timerObject,
        setTimerObject
    } = props
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        if (!isLoading) {
            let interval = null
            if (isActive) {
                interval = setInterval(() => {
                    addMilliSecond(id, timer, setTimer, timerObject, setNotification, setTimerObject, isClock)
                }, 10)
            } else if (!isActive && timer !== 0) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)
        }
    }, [id, isActive, timer, setTimer, isLoading, isClock, timerObject, setTimerObject, setNotification])

    return (
        <section className="h-full">
            <h1 className="text-center md:text-none md:flex text-6xl w-fit mt-auto mx-auto pt-1">
                <p>
                    {
                        capitalizeFirstLetter(
                            timerObject.daysOfWeek[timerObject.dayOfWeek]
                        ) + ","
                    }
                </p>
                <p className="lg:mx-2">
                {" The " +
                    timerObject.dayOfMonth}{getNumberSuffix(timerObject.dayOfMonth)
                + " of " +
                    capitalizeFirstLetter(
                        timerObject.monthsOfYear[timerObject.monthOfYear]
                    )
                + ", "}
                </p>
                <p>
                    {timerObject.year} {timerObject.yearSuffix}
                </p>
            </h1>
            <h1 className="text-5xl w-fit mx-auto pt-6">
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

export default Timer
