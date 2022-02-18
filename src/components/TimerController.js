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
    const TNTKeys = Object.keys(TIMENAMESANDTYPES)
    const [changeTimerValue, setChangeTimerValue] = useState("")
    const [timerStateButtonText, setTimerStateButtonText] = useState("Start")
    const [timerStateButtonColor, setTimerStateButtonColor] = useState("bg-green-500")

    return (
        <>
            <button 
                disabled={isLoading} 
                className={"text-white text-xl rounded px-2 py-1 " + timerStateButtonColor}
                onClick={() => {
                    setIsActive(!isActive)
                }}
            >
                {timerStateButtonText}
            </button>
            <div>
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
        </>
	)
}

export default TimerController
