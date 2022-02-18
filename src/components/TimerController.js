// Packages
import { useState } from 'react'
// Objects
import { TIMENAMESANDTYPES } from "../helpers/objects"
import { addUnit } from "../helpers/timer"

const TimerController = (props) => {
    const { 
        isLoading, isClock,
        isActive, setIsActive,
        timer, setTimer, 
        timerObject, setTimerObject, 
    } = props
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
                    className={"text-white text-3xl rounded px-3 py-2 mb-6 " + timerStateButtonColor}
                    onClick={() => {
                        toggleTimerStateButtonCSS()
                        setIsActive(!isActive)
                    }}
                >
                    {timerStateButtonText}
                </button>
            </center>
            <div className="my-auto flex text-3xl">
                <input 
                    className="bg-gray-100 px-3 py-2 rounded-l-md w-40"
                    type="text" 
                    name="Change Clock" 
                    placeholder="+/- Time"
                    value={changeTimerValue}
                    onChange={(event) => {
                        setChangeTimerValue(event.target.value)
                    }}
                />
                <div className="border-y border-r rounded-r-md px-3 py-2 divide divide-x">
                    {
                        TNTKeys.map((TNTKey, i) => {
                            return (
                                <button 
                                    key={i}
                                    className="px-2"
                                    disabled={isLoading} 
                                    onClick={() => {
                                        if (changeTimerValue) {
                                            addUnit(
                                                timer, setTimer, 
                                                timerObject, setTimerObject, 
                                                TIMENAMESANDTYPES[TNTKey].type, 
                                                parseInt(changeTimerValue), isClock
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
