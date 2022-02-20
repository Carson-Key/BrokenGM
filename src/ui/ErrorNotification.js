// Packages
import { useContext } from 'react'
// Context
import { NotificationContext } from '../contexts/Notification'

const ErrorNotification = (props) => {
    const { message, className } = props
    const setNotification = useContext(NotificationContext)[1]

    return (
        <div className="absolute top-14 w-screen">
            <div className={"flex justify-between w-fit rounded-lg text-xl pl-5 py-2 mt-1 mx-auto " + className}>
                <p>{message}</p>
                <button className="ml-4 mr-2" onClick={() => {        
                    setNotification(
                        {
                            type: 'SET_NOTIFICATION', 
                            payload: {occurs: false, message: "", type: ""}
                        }
                    )}}
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default ErrorNotification
