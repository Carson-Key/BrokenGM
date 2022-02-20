// Packages
import { useContext } from 'react'
// UI
import Notification from '../ui/Notification'
// Context
import { NotificationContext } from '../contexts/Notification'
// Helpers
import { notificationClassNameGenerator } from '../helpers/notifications'

const NotificationHandler = () => {
    const notification = useContext(NotificationContext)[0]

    if (notification.occurs) {
        return (
            <Notification 
                className={notificationClassNameGenerator(notification.type)}
                message={notification.message}
            />
        ) 
    } else {
        return (
            <></>
        )
    }
}

export default NotificationHandler
