// Packages
import { useParams } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
// Components
import { 
    CampaignLinkCard, 
    ClockSettings, 
    RelationSettings ,
    VotingSystemSettings,
    ClockEventsSettings,
    CharacterNotesSettings,
    AddCampaignItemCard
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
    const [characterNotes, setCharacterNotes] = useState([])
    const [players, setPlayers] = useState([])
    const [gm, setGM] = useState("")

    useEffect(() => {
        getDocument("campaigns", id, setNotification).then((data) => {
            const campaignData = data.data()
            setGM((campaignData.gm) ? campaignData.gm : "")
            setClocks((campaignData.clocks) ? campaignData.clocks : [])
            setRelations((campaignData.relations) ? campaignData.relations : [])
            setVotingSystems((campaignData.votingsystems) ? campaignData.votingsystems : [])
            setClockEvents((campaignData.clockevents) ? campaignData.clockevents : [])
            setCharacterNotes((campaignData.characternotes) ? campaignData.characternotes : [])
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
                <AddCampaignItemCard
                    id={id}
                    clocks={clocks}
                    events={clockEvents}
                />
                <CampaignLinkCard 
                    docID="clocks"
                    path="clock"
                    items={clocks} 
                    isAdmin={isAdmin}
                    playerBody="To Clock"
                    players={players}
                    clocks={[]}
                    events={clockEvents}
                    Settings={ClockSettings}
                    gm={gm}
                />
                <CampaignLinkCard 
                    docID="relations"
                    path="relation"
                    items={relations} 
                    isAdmin={isAdmin}
                    playerBody="To Relation"
                    players={players}
                    clocks={[]}
                    events={[]}
                    Settings={RelationSettings}
                    gm={gm}
                />
                <CampaignLinkCard 
                    docID="votingsystems"
                    path="votingsystem"
                    items={votingSystems} 
                    isAdmin={isAdmin}
                    playerBody="To Voting System"
                    players={players}
                    clocks={[]}
                    events={[]}
                    Settings={VotingSystemSettings}
                    gm={gm}
                />
                <CampaignLinkCard 
                    docID="clockevents"
                    path="clockevents"
                    items={clockEvents} 
                    isAdmin={isAdmin}
                    playerBody="To Clock Events"
                    players={players}
                    clocks={clocks}
                    events={[]}
                    Settings={ClockEventsSettings}
                    gm={gm}
                />
                <CampaignLinkCard 
                    docID="characternotes"
                    path="characternotes"
                    items={characterNotes} 
                    isAdmin={isAdmin}
                    playerBody="To Notes"
                    players={players}
                    clocks={[]}
                    events={[]}
                    Settings={CharacterNotesSettings}
                    gm={gm}
                />
            </Container>
        </IsLoading>
    )
}

export default Campaign
