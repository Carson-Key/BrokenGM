// Packages
import { useState, useEffect, useContext } from "react"
// Components
import ConditionalRender from '../ConditionalRender'
// Contexts
import { NotificationContext } from '../../contexts/Notification'
// Helpers
import { tickTimer } from '../../helpers/clock'
import { updateDocumentWithPromise } from '../../helpers/firestore.js'
import { firePing } from "../../helpers/notifications"

const Controller = (props) => {
    const { 
        id, isAdmin,
        timer, setTimer,
        clock, setClock, isClock, 
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const startStopButtonStyleObject = {
        start: {
            text: "Start",
            css: "bg-green-500"
        },
        stop: {
            text: "Stop",
            css: "bg-red-500"
        }
    }
    const [changeTimerValue, setChangeTimerValue] = useState("")
    const [timerStateButtonText, setTimerStateButtonText] = useState(startStopButtonStyleObject.start.text)
    const [timerStateButtonColor, setTimerStateButtonColor] = useState(startStopButtonStyleObject.start.css)

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
    useEffect(() => {
        if (clock.isActive) {
            setTimerStateButtonText(startStopButtonStyleObject.stop.text)
            setTimerStateButtonColor(startStopButtonStyleObject.stop.css)
        } else {
            setTimerStateButtonText(startStopButtonStyleObject.start.text)
            setTimerStateButtonColor(startStopButtonStyleObject.start.css)
        }
    }, [clock, startStopButtonStyleObject.stop, startStopButtonStyleObject.start])

    const toggleTimerStateButtonCSS = () => {
        if (timerStateButtonText === startStopButtonStyleObject.start.text) {
            setTimerStateButtonText(startStopButtonStyleObject.stop.text)
            setTimerStateButtonColor(startStopButtonStyleObject.stop.css)
        } else {
            setTimerStateButtonText(startStopButtonStyleObject.start.text)
            setTimerStateButtonColor(startStopButtonStyleObject.start.css)
        }
    }

    return (
        <ConditionalRender condition={isAdmin}>
            <section className="mx-auto w-fit my-4">
                <button 
                    className={"text-white text-center text-md md:text-3xl rounded px-3 py-2 " + timerStateButtonColor}
                    onClick={() => {
                        toggleTimerStateButtonCSS()
                        updateDocumentWithPromise(
                            "clocks", id, 
                            {...clock, timer, isActive: !clock.isActive}, 
                            setNotification, isClock
                        ).then(() => {
                            setClock(prev => ({...prev, isActive: !prev.isActive}))
                        })
                    }}
                >
                    {timerStateButtonText}
                </button>
                <button 
                    className={"ml-3 text-white text-md md:text-3xl rounded px-3 py-2 mb-6 bg-blue-500"}
                    onClick={() => {
                        updateDocumentWithPromise(
                            "clocks", id, 
                            {...clock, timer}, 
                            setNotification, isClock
                        ).then(() => {
                            firePing(setNotification, "Successful save to Firestore", "You have successfully saved the clock")
                        })
                    }}
                >
                    Save Timer
                </button>
            </section>
        </ConditionalRender>
	)
}

export default Controller
