// Packages
import { useParams } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
// Components
import Clocks from '../components/Clocks'
import Relations from '../components/Relations'
import VotingSystems from '../components/VotingSystems'
import IsLoading from '../components/IsLoading'
// UI
import Container from '../ui/Container'
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from "../helpers/firestore"
import { getCurrentUser } from '../helpers/auth'
import { getPlayerObject } from '../helpers/campaign'

const Campaign = () => {
    const { id } = useParams()
    const setNotification = useContext(NotificationContext)[1]
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")
    const [clocks, setClocks] = useState([])
    const [relations, setRelations] = useState([])
    const [votingSystems, setVotingSystems] = useState([])
    const [players, setPlayers] = useState([])

    useEffect(() => {
        getDocument("campaigns", id, setNotification).then((data) => {
            const campaignData = data.data()
            setClocks(campaignData.clocks)
            setRelations(campaignData.relations)
            setVotingSystems(campaignData.votingsystems)
            getCurrentUser(setUID, (uid) => {
                if (campaignData.admins.includes(uid)) {
                    setIsAdmin(true)
                    setPlayers(getPlayerObject(campaignData.players, setNotification))
                }
            })
            setIsLoading(false)
        })
    }, [id, setNotification])

    return (
        <IsLoading isLoading={isLoading}>
            <Container>
                <Clocks clocks={clocks} />
                <Relations relations={relations} />
                <VotingSystems votingSystems={votingSystems} />
            </Container>
        </IsLoading>
    )
}

export default Campaign
