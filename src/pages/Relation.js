// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import Timer from "../components/Timer"
import TimerController from "../components/TimerController"
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// UI
import Container from "../ui/Container"
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'

const Relation = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [relations, setRelations] = useState([])
    const [isRelation, setIsRelation] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        const getClockData = async () => {
            getDocument("relations", id, setNotification).then((data) => {
                setRelations(data.data().npcs)
                setIsRelation(data.exists())
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
    }, [id, isLoading, uid, setNotification])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="mt-auto">
                {
                    relations.map((relation) => {
                        return (
                            <p>{relation.name}</p>
                        )
                    })
                }
            </Container>
        </IsLoading>
	)
}

export default Relation
