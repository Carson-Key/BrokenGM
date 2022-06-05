// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import { Timer, Controller } from '../components/Clock'
import IsLoading from '../components/IsLoading'
// UI
import Container from '../ui/Container'
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'

const Clock = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0)
    const [clock, setClock] = useState({})
    const [isClock, setIsClock] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        if (isLoading) {
            getDocument("clocks", id, setNotification).then((data) => {
                setTimer(data.data().timer)
                setClock(data.data())
                setIsClock(data.exists())
                getCurrentUser(setUID, (uid) => {
                    if (data.data().admins.includes(uid)) {
                        setIsAdmin(true)
                    }
                })
                setIsLoading(false)
            })
        }
    }, [id, isLoading, uid, setNotification, clock, timer])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto">
                <Timer
                    timer={timer}
                    clock={clock}
                />
                <Controller
                    id={id} isAdmin={isAdmin}
                    timer={timer} setTimer={setTimer}
                    clock={clock} setClock={setClock} isClock={isClock}
                />
            </Container>
        </IsLoading>
	)
}

export default Clock
