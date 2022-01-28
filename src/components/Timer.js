// Packages
import { useState, useEffect } from 'react'
// Helpers
import { splitNumberToReverseArray, defaultAccessArray } from '../helpers/misc'

const Timer = (props) => {
    const { 
        timer, 
        setTimer,
        isActive,
        isLoading
    } = props

    const [dividedTimer, setDividedTimer] = useState(splitNumberToReverseArray(timer))

    const getTimerSection = (indexOne, indexTwo) => {
        return (
            defaultAccessArray(dividedTimer, indexTwo, "0") + 
            defaultAccessArray(dividedTimer, indexOne, "0")
        )
    }

    useEffect(() => {
        if (!isLoading) {
            if (timer === 0) {
                setDividedTimer([])
            } 
            if (!isLoading) {
                setDividedTimer(splitNumberToReverseArray(timer))
            }
            let interval = null
            if (isActive) {
              interval = setInterval(() => {
                setTimer(timer => timer + 1)
                setDividedTimer(splitNumberToReverseArray(timer))
              }, 10)
            } else if (!isActive && timer !== 0) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)
        }
      }, [isActive, timer, setTimer, isLoading])

    if (isLoading) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <h1>
                {
                    getTimerSection(6, 7) + ":" + 
                    getTimerSection(4, 5) + ":" + 
                    getTimerSection(2, 3) + ":" + 
                    getTimerSection(0, 1)
                }
            </h1>
        )
    }
}

export default Timer
