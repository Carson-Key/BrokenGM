// Packages
import { useContext, useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa"
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
    const { items, isAdmin, docID, playerBody, path, Settings, players, clocks, events, gm } = props
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
                        <Card>
                            <CardTitle className="flex justify-between" >
                                <div className="w-11/12 flex justify-center">
                                    <Link to={"/" + path + "/" + item.id}>
                                        <p>{item.name}</p>
                                    </Link>  
                                </div>
                                <div className="w-5">
                                    <button
                                        onClick={() => {
                                            if (docID === "votingsystems") {
                                                console.log("vote")
                                            } else {
                                                console.log("yes")
                                            }
                                        }}
                                    ><FaTrash/></button>
                                </div>  
                            </CardTitle>     
                            {<Settings gm={gm} players={players} id={item.id} clocks={clocks} events={events} />}
                        </Card>
                    </ConditionalRender>
                )
            } else {
                return (<Fragment key={i}></Fragment>)
            }
        })
    )
}

export default CampaignLinkCard
