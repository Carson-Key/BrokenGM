// Packages
import { useEffect, useContext } from "react"
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { tickTimer } from '../../helpers/clock'

const Controller = (props) => {
    const { 
        id, isAdmin,
        timer, setTimer,
        clock, setClock, isClock, 
    } = props
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        let interval = null
        if (clock.isActive) {
            interval = setInterval(() => {
                tickTimer(
                    id, timer, setTimer, 
                    clock, setClock, setNotification, 
                    isAdmin, isClock
                )
            }, 10)
        } else if (!clock.isActive) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [id, timer, clock, isAdmin, isClock, setClock, setTimer, setNotification])

    return (
        <>
            <button onClick={() => {
                setClock(prev => ({...prev, isActive: !prev.isActive}))
            }}>Start</button>
        </>
	)
}

export default Controller
