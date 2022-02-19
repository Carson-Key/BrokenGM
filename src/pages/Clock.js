// Packages
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Container from "../components/Container"
import Timer from "../components/Timer"
import TimerController from "../components/TimerController"
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// UI
import CenterScreen from '../ui/CenterScreen'
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
    const [isTimeout, setIsTimeout] = useState(false)
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
        setTimeout(() => {
            if (isLoading) {
                setIsLoading(false)
                setIsTimeout(true)
            }
        }, 15000)
    }, [id, isLoading, uid])

    return (
        <ConditionalRender 
            condition={!isTimeout && isLoading}
            returnComponent={
                <CenterScreen>
                    <h1 className="text-6xl w-screen text-center mt-auto mx-auto">
                        Request Timed Out
                    </h1>
                </CenterScreen>
            }
        >
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
        </ConditionalRender>
	)
}

export default Clock
