export const NOTIFICATIONTYPES = {
    error: "error",
    ping: "ping"
}

export const notificationClassNameGenerator = (type) => {
    if (type === NOTIFICATIONTYPES.error) {
        return "text-white bg-red-400"
    } else if (type === NOTIFICATIONTYPES.ping) {
        return "text-white bg-green-400"
    } else {
        return "text-white bg-gray-400"
    }
}

export const fireBaseError = (setNotification, code, message) => {
    console.log("Firebase Error with Code: " + code + ", and Message: " + message)
    setNotification(
        {
            type: 'SET_NOTIFICATION', 
            payload: {occurs: true, message: message, type: NOTIFICATIONTYPES.error}
        }
    )
}