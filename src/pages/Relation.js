// Packages
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
// Components
import IsLoading from '../components/IsLoading'
import ConditionalRender from '../components/ConditionalRender'
// UI
import Container from "../ui/Container"
import RelationCard from '../ui/RelationCard'
import AddRelationCard from '../ui/AddRelationCard'
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
    const [playerCharacters, setPlayerCharacters] = useState([])
    const [isRelation, setIsRelation] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [uid, setUID] = useState("")

    useEffect(() => {
        const getClockData = async () => {
            getDocument("relations", id, setNotification).then((data) => {
                setRelations(data.data().npcs)
                setPlayerCharacters(data.data().playerCharacters)
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
            <Container className="flex flex-wrap justify-evenly md:px-2 md:py-1 mx-auto">
                {
                    relations.map((relation, i) => {
                        let relationMinusName = {...relation}
                        delete relationMinusName.name
                        return (
                            <RelationCard 
                                key={i} 
                                id={id}
                                isRelation={isRelation}
                                isAdmin={isAdmin}
                                name={relation.name} 
                                index={i}
                                relation={relationMinusName} 
                                relations={relations}
                                setRelations={setRelations}
                            />
                        )
                    })
                }
                <ConditionalRender condition={isAdmin}>
                    <AddRelationCard
                        id={id}
                        playerCharacters={playerCharacters}
                        setRelations={setRelations}
                        relations={relations}
                        isRelation={isRelation}
                    />
                </ConditionalRender>
            </Container>
        </IsLoading>
	)
}

export default Relation
