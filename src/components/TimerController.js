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
        <section className="flex justify-evenly my-6">
            <button 
                disabled={isLoading} 
                className={"text-white text-3xl rounded px-3 py-2 " + timerStateButtonColor}
                onClick={() => {
                    toggleTimerStateButtonCSS()
                    setIsActive(!isActive)
                }}
            >
                {timerStateButtonText}
            </button>
            <div className="my-auto">
                <input 
                    type="text" 
                    name="Change Clock" 
                    placeholder="+/- Time"
                    value={changeTimerValue}
                    onChange={(event) => {
                        setChangeTimerValue(event.target.value)
                    }}
                />
                {
                    TNTKeys.map((TNTKey, i) => {
                        return (
                            <button 
                                key={i}
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
        </section>
	)
}

export default TimerController
