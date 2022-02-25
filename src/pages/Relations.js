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

const Relations = () => {
    const setNotification = useContext(NotificationContext)[1]
    const [uid, setUID] = useState("")
    const [relations, setRelations] = useState([])
    const [relationsArray, setRelationsArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadedUID, setLoadedUID] = useState(false)
    const [loadedRelationsArray, setLoadedRelationsArray] = useState(false)
    const [loadedRelations, setLoadedRelations] = useState(false)

    useEffect(() => {
        const getRelations = () => {
            if (!loadedUID) {
                getCurrentUser(setUID, () => {
                    setLoadedUID(true)
                })
            }
            if (loadedUID && !loadedRelationsArray) {
                getDocument("users", uid, setNotification).then((data) => {
                    if (data.data().clocks.length === 0) {
                        setIsLoading(false)
                    } else {
                        setRelationsArray(data.data().relations)
                        setLoadedRelationsArray(true)
                    }
                })
            }
            if (loadedRelationsArray && !loadedRelations) {
                let tempRelationArray = []
                relationsArray.forEach((relation, i) => {
                    getDocument("relations", relation, setNotification).then((data) => {
                        tempRelationArray[i] = {title: data.data().name, id: relation}
                        if (i === (relationsArray.length - 1)) {
                            setRelations(tempRelationArray)
                            setLoadedRelations(true)
                        }
                    })
                })
            }
            if (loadedUID && loadedRelationsArray && loadedRelations) {
                setIsLoading(false)
            }
        }  
        if (isLoading) {
            getRelations()
        }
    })

    return (
        <IsLoading isLoading={isLoading}>
            <ConditionalRender 
                condition={relations.length !== 0}
                returnComponent={
                    <CenterScreen>
                        <h1 className="text-4xl w-screen text-center mt-auto mx-auto">
                            You Don't Have Any Relations
                        </h1>
                    </CenterScreen>    
                }
            >
                <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
                    {
                        relations.map((clock, i) => {
                            return <ClockCard key={i} title={clock.title} clockID={clock.id} />
                        })
                    }
                </Container>
            </ConditionalRender>
        </IsLoading>
	)
}

export default Relations
