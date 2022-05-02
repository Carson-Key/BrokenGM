// Packages
import { useState, useContext, useEffect } from 'react'
// Contexts
import { NotificationContext } from '../contexts/Notification'
// Helpers
import { addUnit } from "../helpers/timer"
import { updateDocumentWithPromise } from "../helpers/firestore"
import { fireError, firePing } from "../helpers/notifications"
// Objects
import { TIMENAMESANDTYPES } from "../helpers/objects"

const TimerController = (props) => {
    const { 
        id,
        isLoading, isClock,
        isActive, setIsActive,
        timer, setTimer, 
        timerObject, setTimerObject, 
    } = props
    const setNotification = useContext(NotificationContext)[1]
    const timerStateObject = {
        start: {
            text: "Start",
            css: "bg-green-500"
        },
        stop: {
            text: "Stop",
            css: "bg-red-500"
        }
    }
    const TNTKeys = Object.keys(TIMENAMESANDTYPES)
    const [changeTimerValue, setChangeTimerValue] = useState("")
    const [timerStateButtonText, setTimerStateButtonText] = useState(timerStateObject.start.text)
    const [timerStateButtonColor, setTimerStateButtonColor] = useState(timerStateObject.start.css)

    useEffect(() => {
        if (isActive) {
            setTimerStateButtonText(timerStateObject.stop.text)
            setTimerStateButtonColor(timerStateObject.stop.css)
        } else {
            setTimerStateButtonText(timerStateObject.start.text)
            setTimerStateButtonColor(timerStateObject.start.css)
        }
    }, [isActive, timerStateObject.stop, timerStateObject.start])

    const toggleTimerStateButtonCSS = () => {
        if (timerStateButtonText === "Start") {
            setTimerStateButtonText(timerStateObject.stop.text)
            setTimerStateButtonColor(timerStateObject.stop.css)
        } else {
            setTimerStateButtonText(timerStateObject.start.text)
            setTimerStateButtonColor(timerStateObject.start.css)
        }
    }

    return (
        <section className="mx-auto my-6 w-fit">
            <center>
                <button 
                    disabled={isLoading} 
                    className={"text-white text-md md:text-3xl rounded px-3 py-2 mb-6 " + timerStateButtonColor}
                    onClick={() => {
                        toggleTimerStateButtonCSS()
                        setIsActive(!isActive)
                    }}
                >
                    {timerStateButtonText}
                </button>
                <button 
                    disabled={isLoading} 
                    className={"ml-3 text-white text-md md:text-3xl rounded px-3 py-2 mb-6 bg-blue-500"}
                    onClick={() => {
                        updateDocumentWithPromise(
                            "clocks", id, 
                            {...timerObject, timer}, 
                            setNotification, isClock
                        ).then(() => {
                            firePing(setNotification, "Successful save to Firestore", "You have successfully saved the clock")
                        })
                    }}
                >
                    Save Timer
                </button>
            </center>
            <div className="my-auto text-center flex text-md md:text-3xl">
                <input 
                    className="bg-gray-100 px-1 py-1 md:px-3 rounded-l-md w-10 md:w-40"
                    type="text" 
                    name="Change Clock" 
                    placeholder="+/- Time"
                    value={changeTimerValue}
                    onChange={(event) => {
                        setChangeTimerValue(event.target.value)
                    }}
                />
                <div className="border-y border-r rounded-r-md px-1 py-1 md:px-3 md:py-2 divide divide-x">
                    {
                        TNTKeys.map((TNTKey, i) => {
                            return (
                                <button 
                                    key={i}
                                    className="px-2"
                                    disabled={isLoading} 
                                    onClick={() => {
                                        if (changeTimerValue && !isNaN(parseInt(changeTimerValue))) {
                                            addUnit(
                                                id,
                                                timer, setTimer, 
                                                timerObject, setTimerObject, 
                                                TIMENAMESANDTYPES[TNTKey].type, 
                                                setNotification,
                                                parseInt(changeTimerValue), isClock
                                            )
                                        } else {
                                            fireError(
                                                setNotification, 
                                                "Bad User Input", "Illegal character, please only use numbers"
                                            )
                                        }
                                    }}
                                >
                                    {TIMENAMESANDTYPES[TNTKey].name}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </section>
	)
}

export default TimerController
