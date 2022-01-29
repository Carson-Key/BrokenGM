// Packages
import { useEffect } from 'react'
// Helpers

const Timer = (props) => {
    const { 
        timer, 
        setTimer,
        isActive,
        isLoading
    } = props

    useEffect(() => {
        if (!isLoading) {
            let interval = null
            if (isActive) {
              interval = setInterval(() => {
                setTimer(timer => timer + 10)
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
