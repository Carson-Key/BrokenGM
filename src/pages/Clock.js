// Packages
import { useEffect, useState } from 'react'
// Components
import Container from "../components/Container"
import Timer from "../components/Timer"
// Helpers
import { getDocument } from "../helpers/firestore"

const Clock = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)

    async function getClockData() {
        let clockData = await (await getDocument("clocks", "b37722f7-00da-4d7c-b9f5-67325445c313")).data()
        setTimer(clockData.timer)
        setIsLoading(false)
    }

    useEffect(() => {
        getClockData()
    }, [])

    return (
        <Container>
            <Timer 
                timer={timer} 
                setTimer={setTimer}
                isActive={isActive}
                isLoading={isLoading}
            />
            <button disabled={isLoading} onClick={() => {setIsActive(!isActive)}}>start/stop</button>
        </Container>
	)
}

export default Clock
