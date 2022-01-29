import { updateDocument } from './firestore'

export const addMilliSecond = (timer, setTimer, timerObject, isClock = false, ammount = 10) => {
    setTimer(timer => timer + ammount)
    if (timer % 60000 === 0) {
        updateDocument(
            "clocks", 
            "b37722f7-00da-4d7c-b9f5-67325445c313", 
            { ...timerObject, timer }, 
            isClock
        )
    }
}

