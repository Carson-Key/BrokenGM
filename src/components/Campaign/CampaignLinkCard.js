// Packages
import { useContext, useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
// Components
import ConditionalRender from '../ConditionalRender'
// UI
import Card from '../../ui/Card'
import CardTitle from '../../ui/CardTitle'
import GenericLinkCard from '../../ui/GenericLinkCard'
// Contexts
import { NotificationContext } from "../../contexts/Notification"
// Helpers
import { getDocument } from '../../helpers/firestore'

const CampaignLinkCard = (props) => {
    const { items, isAdmin, docID, playerBody, path, Settings } = props
    const setNotification = useContext(NotificationContext)[1]
    const [itemArray, setItemArray] = useState([])

    useEffect(() => {
        items.forEach((item, i) => {
            getDocument(docID, item, setNotification, true).then((data) => {
                if (data === "permission-denied") {
                    setItemArray(prev => [...prev, {name: "", id: "", access: false}])
                } else {
                    const itemData = data.data()
                    setItemArray(prev => [...prev, {name: itemData.name, id: item, access: true}])
                }
            })
        })
    }, [docID, items, setNotification])

    return (
        itemArray.map((item, i) => {
            if (item.access) {
                return (
                    <ConditionalRender
                        key={i}
                        condition={isAdmin}
                        returnComponent={
                            <GenericLinkCard 
                                key={i} 
                                title={item.name} 
                                linkPath={"/" + path + "/" + item.id} 
                                innerText={playerBody}
                            />
                        }
                    >
                        <Link to={"/" + path + "/" + item.id}>
                            <Card>
                                <CardTitle>{item.name}</CardTitle>
                                {<Settings/>}
                            </Card>
                        </Link>
                    </ConditionalRender>
                )
            } else {
                return (<Fragment key={i}></Fragment>)
            }
        })
    )
}

export default CampaignLinkCard
