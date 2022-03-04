// Packages
import { useContext, useEffect, useState } from "react"
// Components
import IsLoading from './IsLoading'
import ConditionalRender from "./ConditionalRender"
// UI
import Container from "../ui/Container"
import GenericLinkCard from "../ui/GenericLinkCard"
// Contexts
import { NotificationContext } from "../contexts/Notification"
// Helpers
import { getCurrentUser } from "../helpers/auth"
import { getDocument } from "../helpers/firestore"
import CenterScreen from "../ui/CenterScreen"

const PageOflinkCards = (props) => {
    const { noCardText, cardInnerText, docID, toPath } = props
    const setNotification = useContext(NotificationContext)[1]
    const [uid, setUID] = useState("")
    const [cards, setCards] = useState([])
    const [cardsArray, setCardsArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadedUID, setLoadedUID] = useState(false)
    const [loadedCardsArray, setLoadedCardsArray] = useState(false)
    const [loadedCards, setLoadedCards] = useState(false)

    useEffect(() => {
        const getRelations = () => {
            if (!loadedUID) {
                getCurrentUser(setUID, () => {
                    setLoadedUID(true)
                })
            }
            if (loadedUID && !loadedCardsArray) {
                getDocument("users", uid, setNotification).then((data) => {
                    if (data.data()[docID].length === 0) {
                        setIsLoading(false)
                    } else {
                        setCardsArray(data.data()[docID])
                        setLoadedCardsArray(true)
                    }
                })
            }
            if (loadedCardsArray && !loadedCards) {
                let tempCardsArray = []
                cardsArray.forEach((card, i) => {
                    getDocument(docID, card, setNotification).then((data) => {
                        tempCardsArray[i] = {title: data.data().name, id: card}
                        if (i === (cardsArray.length - 1)) {
                            setCards(tempCardsArray)
                            setLoadedCards(true)
                        }
                    })
                })
            }
            if (loadedUID && loadedCardsArray && loadedCards) {
                setIsLoading(false)
            }
        }  
        if (isLoading) {
            getRelations()
        }
    })

    return (
        <IsLoading isLoading={isLoading}>
            <ConditionalRender 
                condition={cards.length !== 0}
                returnComponent={
                    <CenterScreen>
                        <h1 className="text-4xl w-screen text-center mt-auto mx-auto">
                            {noCardText}
                        </h1>
                    </CenterScreen>    
                }
            >
                <Container className="flex flex-wrap justify-evenly md:justify-start md:px-2 md:py-1">
                    {
                        cards.map((cards, i) => {
                            return (
                                <GenericLinkCard 
                                    key={i} 
                                    title={cards.title} 
                                    linkPath={"/" + toPath + "/" + cards.id} 
                                    innerText={cardInnerText}
                                />
                            )
                        })
                    }
                </Container>
            </ConditionalRender>
        </IsLoading>
	)
}

export default PageOflinkCards
