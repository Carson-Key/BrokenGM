// Packages
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
// Components
import Container from "../components/Container"
import IsLoading from '../components/IsLoading'
// UI
import ClockCard from "../ui/ClockCard"
// Helpers
import { getCurrentUser } from "../helpers/auth"
import { getDocument } from "../helpers/firestore"

const Clocks = () => {
    const [uid, setUID] = useState("")
    const [clocks, setClocks] = useState([])
    const [clocksArray, setClocksArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadedUID, setLoadedUID] = useState(false)
    const [loadedClocksArray, setLoadedClocksArray] = useState(false)
    const [loadedClocks, setLoadedClocks] = useState(false)

    useEffect(() => {
        const getClocks = () => {
            if (!loadedUID) {
                getCurrentUser(setUID)
                setLoadedUID(true)
            }
            if (loadedUID && !loadedClocksArray) {
                getDocument("users", uid).then((data) => {
                    if (data.data().clocks.length === 0) {
                        setIsLoading(false)
                    } else {
                        setClocksArray(data.data().clocks)
                        setLoadedClocksArray(true)
                    }
                })
            }
            if (loadedClocksArray && !loadedClocks) {
                let tempClockArray = []
                clocksArray.forEach((clock, i) => {
                    getDocument("clocks", clock).then((data) => {
                        tempClockArray[i] = {title: data.data().name, id: clock}
                        if (i === (clocksArray.length - 1)) {
                            setClocks(tempClockArray)
                            setLoadedClocks(true)
                        }
                    })
                })
            }
            if (loadedUID && loadedClocksArray && loadedClocks) {
                setIsLoading(false)
            }
        }  
        if (isLoading) {
            getClocks()
        }
    })

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
                {
                    clocks.map((clock, i) => {
                        return <ClockCard key={i} title={clock.title} />
                    })
                }
            </Container>
        </IsLoading>
	)
}

export default Clocks
