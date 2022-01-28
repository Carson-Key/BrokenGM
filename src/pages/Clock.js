// Packages
import { useState } from 'react'
// Components
import Container from "../components/Container"
import Timer from "../components/Timer"

const Clock = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(true)

    function reset() {
        setTimer(0)
        setIsActive(false)
    }

    return (
        <Container>
            <Timer 
                timer={timer} 
                setTimer={setTimer}
                isActive={isActive}
            />
            <button onClick={() => {setIsActive(!isActive)}}>start/stop</button>
            <button onClick={reset}>reset</button>
        </Container>
	)
}

export default Clock
