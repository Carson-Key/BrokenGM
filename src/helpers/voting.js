// Helpers
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
export const reverseFormatCharacterName = (name) => {
    let brokenName = name.split(' ')
    brokenName.forEach((word, i) => {
        brokenName[i] = word.toLowerCase()
    })
    const joinedName = brokenName.join('_')

    return joinedName
}
export const returnArrayOfActiveVotes = (votes) => {
    const tempVotes = Object.keys(votes)
    let returnedVotes = []
    let returnedVoteIndexes = []

    tempVotes.forEach((vote, i) => {
        if (!votes[vote].locked) {
            returnedVotes.push(vote)
            returnedVoteIndexes.push(i)
        }
    })

    return [returnedVotes, returnedVoteIndexes.reverse()]
}