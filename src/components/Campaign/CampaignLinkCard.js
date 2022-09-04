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
import { PopUpContext } from "../../contexts/PopUp"
// Helpers
import { getDocument, deleteDocumentWithPromise, updateDocumentWithPromise } from '../../helpers/firestore'
import { firePopUp } from '../../helpers/popup'
import { removeElementFromArray } from '../../helpers/misc'

const CampaignLinkCard = (props) => {
    const { id, items, isAdmin, docID, playerBody, path, Settings, players, clocks, events, gm } = props
    const setNotification = useContext(NotificationContext)[1]
    const setPopUp = useContext(PopUpContext)[1]
    const [itemArray, setItemArray] = useState([])
    const [itemExists, setItemExists] = useState(false)

    useEffect(() => {
        items.forEach((item, i) => {
            getDocument(docID, item, setNotification, true).then((data) => {
                if (data === "permission-denied") {
                    setItemArray(prev => [...prev, {name: "", id: "", access: false}])
                } else {
                    const itemData = data.data()
                    setItemExists(data.exists())
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
                                            firePopUp(
                                                "Are you sure you want to delete " + item.name,
                                                () => {
                                                    if (docID === "votingsystems") {
                                                        console.log("vote")
                                                    } else {
                                                        deleteDocumentWithPromise(docID, item.id, setNotification, itemExists).then(() => {
                                                            getDocument("campaigns", id, setNotification, true).then((data) => {
                                                                let tempItems = removeElementFromArray([...data.data()[docID]], item.id)
                                                                updateDocumentWithPromise("campaigns", id, { [docID]: tempItems }, setNotification, true).then(() => {
                                                                    window.location.reload(false)
                                                                })
                                                            })
                                                        })
                                                    }
                                                },
                                                () => {},
                                                setPopUp
                                            )
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
