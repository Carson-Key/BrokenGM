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

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
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
