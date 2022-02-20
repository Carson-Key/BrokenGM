// Packages
import { useContext } from 'react'
// Context
import { NotificationContext } from '../contexts/Notification'

const NotificationHandler = () => {
    const notification = useContext(NotificationContext)[0]

    if (notification.occurs) {
        return (
            <p>help me</p>
        ) 
    } else {
        return (
            <></>
        )
    }
}

export default NotificationHandler
