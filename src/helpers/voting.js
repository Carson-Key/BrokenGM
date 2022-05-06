// Helpers
import { capitalizeFirstLetter } from "./misc"

export const formatCharacterName = (name) => {
    let brokenName = name.split('-')
    brokenName.forEach((word, i) => {
        const capitalizedWord = capitalizeFirstLetter(word)
        brokenName[i] = capitalizedWord
    })
    const joinedName = brokenName.join(' ')

    return joinedName
}
export const reverseFormatCharacterName = (name) => {
    let brokenName = name.split(' ')
    brokenName.forEach((word, i) => {
        brokenName[i] = word.toLowerCase()
    })
    const joinedName = brokenName.join('-')

    return joinedName
}