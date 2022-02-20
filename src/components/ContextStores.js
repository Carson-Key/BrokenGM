// Stores
import NotificationStore from '../contexts/Notification'

const ContextStores = (props) => {
    const { children } = props

    return (
        <>
            <NotificationStore>
                {children}
            </NotificationStore>
        </>
    )
}

export default ContextStores
