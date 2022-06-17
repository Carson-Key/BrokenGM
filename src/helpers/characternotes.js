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

export const determinSearchQuerry = (name, position, status, tags, searchQuerry) => {
    const loweredName = name.toLowerCase()
    const loweredPosition = position.toLowerCase()
    const loweredStatus = status.toLowerCase()
    const loweredQuerry = searchQuerry.toLowerCase()
    let returnBool = false

    tags.forEach((tag, i) => {
        const sreachTagBoolean = tag.toLowerCase().includes(searchQuerry)
        if (sreachTagBoolean) {
            returnBool = sreachTagBoolean
        }
    })

    return (
        loweredName.includes(loweredQuerry) ||
        loweredPosition.includes(loweredQuerry) ||
        loweredStatus.includes(loweredQuerry) || returnBool
    )
}