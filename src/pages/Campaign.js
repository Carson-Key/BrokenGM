// Packages
import { useParams } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
// Components
import { 
    CampaignLinkCard, 
    ClockSettings, 
    RelationSettings ,
    VotingSystemSettings,
    ClockEventsSettings
} from '../components/Campaign'
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
    const setUID = useState("")[1]
    const [clocks, setClocks] = useState([])
    const [relations, setRelations] = useState([])
    const [votingSystems, setVotingSystems] = useState([])
    const [clockEvents, setClockEvents] = useState([])
    const [players, setPlayers] = useState([])

    useEffect(() => {
        getDocument("campaigns", id, setNotification).then((data) => {
            const campaignData = data.data()
            setClocks((campaignData.clocks) ? campaignData.clocks : [])
            setRelations((campaignData.relations) ? campaignData.relations : [])
            setVotingSystems((campaignData.votingsystems) ? campaignData.votingsystems : [])
            setClockEvents((campaignData.clockevents) ? campaignData.clockevents : [])
            getCurrentUser(setUID, (uid) => {
                if (campaignData.admins.includes(uid)) {
                    setIsAdmin(true)
                    getPlayerObject(campaignData.players, setNotification, setPlayers)
                }
            })
            setIsLoading(false)
        })
    }, [id, setNotification, setUID])

    return (
        <IsLoading isLoading={isLoading}>
            <Container className="flex flex-wrap justify-evenly">
                <CampaignLinkCard 
                    docID="clocks"
                    path="clock"
                    items={clocks} 
                    isAdmin={isAdmin}
                    playerBody="To Clock"
                    players={players}
                    clocks={[]}
                    Settings={ClockSettings}
                />
                <CampaignLinkCard 
                    docID="relations"
                    path="relation"
                    items={relations} 
                    isAdmin={isAdmin}
                    playerBody="To Relation"
                    players={players}
                    clocks={[]}
                    Settings={RelationSettings}
                />
                <CampaignLinkCard 
                    docID="votingsystems"
                    path="votingsystem"
                    items={votingSystems} 
                    isAdmin={isAdmin}
                    playerBody="To Voting System"
                    players={players}
                    clocks={[]}
                    Settings={VotingSystemSettings}
                />
                <CampaignLinkCard 
                    docID="clockevents"
                    path="clockevents"
                    items={clockEvents} 
                    isAdmin={isAdmin}
                    playerBody="To Clock Events"
                    players={players}
                    clocks={clocks}
                    Settings={ClockEventsSettings}
                />
            </Container>
        </IsLoading>
    )
}

export default Campaign
