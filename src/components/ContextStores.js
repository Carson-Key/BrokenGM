// Stores
import NotificationStore from '../contexts/Notification'
import PopUpStore from '../contexts/PopUp'

const ContextStores = (props) => {
    const { children } = props

    return (
        <>
            <PopUpStore>
                <NotificationStore>
                    {children}
                </NotificationStore>
            </PopUpStore>
        </>
    )
}

export default ContextStores
