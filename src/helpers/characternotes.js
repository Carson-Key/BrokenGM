export const generateStatusClasses = (status) => {
    const loweredStatus = status.toLowerCase()
    if (loweredStatus === "alive") {
        return "text-white bg-green-400"
    } else if (loweredStatus === "dead" || loweredStatus === "deceased") {
        return "text-white bg-red-400"
    } else if (loweredStatus === "unknown") {
        return "text-white bg-gray-400"
    } else {
        return "text-white bg-sky-400"
    }
}