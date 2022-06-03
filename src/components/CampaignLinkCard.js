// Packages
import { useContext, useState } from 'react'
// Components
import ConditionalRender from './ConditionalRender'
// UI
import Card from '../ui/Card'
import CardTitle from '../ui/CardTitle'
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getDocument } from '../helpers/firestore'

const CampaignLinkCard = (props) => {
    const { items, isAdmin, uid, players, docID } = props
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
                    condition={isAdmin}
                    returnComponent={
                        <Card key={i}>
                            <CardTitle>{itemObject.name}</CardTitle>
                            <p>This is Item: {item}</p>
                        </Card>
                    }
                >
                    <Card key={i}>
                        <CardTitle>{itemObject.name}</CardTitle>
                        <p>This is Item: {item}</p>
                    </Card>
                </ConditionalRender>
            )
        })
    )
}

export default CampaignLinkCard
