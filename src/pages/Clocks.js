// Components
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Container from "../components/Container"
import { getCurrentUser } from "../helpers/auth"
import { getDocument } from "../helpers/firestore"
// UI
import ClockCard from "../ui/ClockCard"

const Clocks = () => {
    const [uid, setUID] = useState(0)
    const [clocks, setClocks] = useState([])

    useEffect(() => {
        const getClocks = async () => {
            if (uid) {
                let clocksData = await (await getDocument("users", uid))
                setClocks(clocksData.data().clocks)
            } else {
                getCurrentUser(setUID)
            }
        }  
        getClocks()
    }, [uid])

    return (
        <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
            <ClockCard title="test" />
        </Container>
	)
}

export default Clocks
