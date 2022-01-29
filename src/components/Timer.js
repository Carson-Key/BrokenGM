// Packages
import { useEffect } from 'react'
// Helpers
import { addMilliSecond } from '../helpers/timer'

const Timer = (props) => {
    const { 
        timer, 
        setTimer,
        isActive,
        isLoading,
        isClock
    } = props

    useEffect(() => {
        if (!isLoading) {
            let interval = null
            if (isActive) {
                interval = setInterval(() => {
                    addMilliSecond(timer, setTimer, isClock)
                }, 10)
            } else if (!isActive && timer !== 0) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)
        }
    }, [isActive, timer, setTimer, isLoading, isClock])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <h1>
                {
                    ("0" + Math.floor((timer / 3600000) % 60)).slice(-2) + ":" +
                    ("0" + Math.floor((timer / 60000) % 60)).slice(-2) + ":" +
                    ("0" + Math.floor((timer / 1000) % 60)).slice(-2) + ":" +
                    ("0" + ((timer / 10) % 100)).slice(-2)
                }
            </h1>
        )
    }
}

export default Timer
