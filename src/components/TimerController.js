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

    return (
        <>
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
            <div>
                <input type="text" name="Change Clock" placeholder="+/- Time"/>
                {
                    TNTKeys.map((TNTKey, i) => {
                        return (
                            <button 
                                disabled={isLoading} 
                                onClick={() => {
                                    addUnit(
                                        timer, setTimer, 
                                        timerObject, setTimerObject, 
                                        TIMENAMESANDTYPES[TNTKey].type, 1, isClock
                                    )}
                                }
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
