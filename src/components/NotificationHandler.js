// Packages
import { useContext, useEffect } from 'react'
// Components
import ConditionalRender from './ConditionalRender'
// UI
import Notification from '../ui/Notification'
// Context
import { NotificationContext, initialState } from '../contexts/Notification'
// Helpers
import { notificationClassNameGenerator } from '../helpers/notifications'

const NotificationHandler = () => {
    const [notification, setNotification] = useContext(NotificationContext)

    useEffect(() => {
        if (notification.occurs) {
            setTimeout(() => {
                setNotification(
                    { type: 'SET_NOTIFICATION', payload: initialState }
                )
            }, 15000)
        }
    }, [notification, setNotification])

    return (
        <ConditionalRender condition={notification.occurs}>
            <Notification 
                className={notificationClassNameGenerator(notification.type)}
                message={notification.message}
            />
        </ConditionalRender>
    )
}

export default NotificationHandler
