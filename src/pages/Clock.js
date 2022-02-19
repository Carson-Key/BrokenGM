// Packages
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Container from "../components/Container"
import Timer from "../components/Timer"
import TimerController from "../components/TimerController"
// Helpers
import { getDocument } from "../helpers/firestore"

const Clock = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0)
    const [timerObject, setTimerObject] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isClock, setIsClock] = useState(false)

    useEffect(() => {
        const getClockData = async () => {
            let clockData = await (await getDocument("clocks", id))
            setTimer(clockData.data().timer)
            setTimerObject(clockData.data())
            setIsClock(clockData.exists())
            setIsLoading(false)
        }

        getClockData()
    }, [id])

    return (
        <Container className="mt-auto">
            <Timer 
                id={id}
                timer={timer} 
                setTimer={setTimer}
                isActive={isActive}
                isLoading={isLoading}
                isClock={isClock}
                timerObject={timerObject}
                setTimerObject={setTimerObject}
            />
            <TimerController 
                id={id}
                isLoading={isLoading} 
                isClock={isClock}
                isActive={isActive}
                setIsActive={setIsActive}
                timer={timer}
                setTimer={setTimer}
                timerObject={timerObject} 
                setTimerObject={setTimerObject}
            />
        </Container>
	)
}

export default Clock
