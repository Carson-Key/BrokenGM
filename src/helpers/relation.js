// Helper
import { capitalizeFirstLetter } from "./misc"

export const formatCharacterName = (name) => {
    let brokenName = name.split('_')
    brokenName.forEach((word, i) => {
        const capitalizedWord = capitalizeFirstLetter(word)
        brokenName[i] = capitalizedWord
    })
    const joinedName = brokenName.join(' ')

    return joinedName
}