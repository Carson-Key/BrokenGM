// Packages
import { useEffect, useState } from 'react'
// Components
import Container from "../components/Container"

const Clock = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        let interval = null
        if (isActive) {
          interval = setInterval(() => {
            setTimer(timer => timer + 1)
          }, 10)
        }
        return () => clearInterval(interval)
      }, [isActive, timer])

    return (
        <Container>
            {timer}
        </Container>
	)
}

export default Clock
