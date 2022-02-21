// Packages
import { useContext, useEffect, useState } from "react"
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from "../components/ConditionalRender"
// UI
import Container from "../ui/Container"
import ClockCard from "../ui/ClockCard"
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getCurrentUser } from "../helpers/auth"
import { getDocument } from "../helpers/firestore"
import CenterScreen from "../ui/CenterScreen"

const Clocks = () => {
    const setNotification = useContext(NotificationContext)[1]
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
                getCurrentUser(setUID, () => {
                    setLoadedUID(true)
                })
            }
            if (loadedUID && !loadedClocksArray) {
                getDocument("users", uid, setNotification).then((data) => {
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
                    getDocument("clocks", clock, setNotification).then((data) => {
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
            <ConditionalRender 
                condition={clocks.length !== 0}
                returnComponent={
                    <CenterScreen>
                        <h1 className="text-4xl w-screen text-center mt-auto mx-auto">
                            You Don't Have Any Clocks
                        </h1>
                    </CenterScreen>    
                }
            >
                <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
                    {
                        clocks.map((clock, i) => {
                            return <ClockCard key={i} title={clock.title} clockID={clock.id} />
                        })
                    }
                </Container>
            </ConditionalRender>
        </IsLoading>
	)
}

export default Clocks
