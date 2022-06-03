// Packages
import { useContext, useState } from 'react'
// Components
import ConditionalRender from './ConditionalRender'
// UI
import Card from '../ui/Card'
import CardTitle from '../ui/CardTitle'
import GenericLinkCard from '../ui/GenericLinkCard'
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from '../helpers/firestore'

const CampaignLinkCard = (props) => {
    const { items, isAdmin, uid, players, docID, playerBody, path } = props
    const setNotification = useContext(NotificationContext)[1]
    const [itemObject, setItemObject] = useState({name: "Loading..."})

    return (
        items.map((item, i) => {
            getDocument(docID, item, setNotification).then((data) => {
                const itemData = data.data()
                setItemObject({name: itemData.name})
            })

            return (
                <ConditionalRender
                    key={i}
                    condition={isAdmin}
                    returnComponent={
                        <GenericLinkCard 
                            key={i} 
                            title={itemObject.name} 
                            linkPath={"/" + path + "/" + item} 
                            innerText={playerBody}
                        />
                    }
                >
                    <Card>
                        <CardTitle>{itemObject.name}</CardTitle>
                        <p>You are admin</p>
                    </Card>
                </ConditionalRender>
            )
        })
    )
}

export default CampaignLinkCard
