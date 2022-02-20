// Packages
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Container from "../ui/Container"
import Timer from "../components/Timer"
import TimerController from "../components/TimerController"
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'

const Clock = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0)
    const [timerObject, setTimerObject] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isClock, setIsClock] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        const getClockData = async () => {
            getDocument("clocks", id).then((data) => {
                setTimer(data.data().timer)
                setTimerObject(data.data())
                setIsClock(data.exists())
                getCurrentUser(setUID, (uid) => {
                    if (data.data().admins.includes(uid)) {
                        setIsAdmin(true)
                    }
                })
                setIsLoading(false)
            })
        }

        if (isLoading) {
            getClockData()
        }
    }, [id, isLoading, uid])

    return (
        <IsLoading isLoading={isLoading}>
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
                <ConditionalRender condition={isAdmin}>
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
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default Clock
