// Helpers
import { capitalizeFirstLetter } from "./misc"
import { updateDocument } from './firestore'
import { fireError } from './notifications'

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
        const capitalizedWord = word.toLowerCase()
        brokenName[i] = capitalizedWord
    })
    const joinedName = brokenName.join('_')

    return joinedName
}
export const changeRelationValue = (
    value, index, character, relations, setRelations, setNotification, id, isRelation
) => {
    if (!isNaN(value)) {
        let tempRelations = [...relations]
        tempRelations[index][character] = tempRelations[index][character] + value
    
        setRelations(tempRelations)
        updateDocument(
            "relations", 
            id, 
            {npcs: tempRelations}, 
            setNotification,
            isRelation
        )
    } else {
        fireError(
            setNotification, 
            "Bad User Input", "Illegal character, please only use numbers"
        )
    }
}
export const addCharacterRelation = (
    name, index, relations, setRelations, setNotification, id, isRelation, setNameToAdd
) => {
    let tempRelations = [...relations]
    tempRelations[index][reverseFormatCharacterName(name)] = 0

    setRelations(tempRelations)
    setNameToAdd("")
    updateDocument(
        "relations", 
        id, 
        {npcs: tempRelations}, 
        setNotification,
        isRelation
    )
}
export const addRelation = (
    newRelation, relations, setRelations, setNotification, id, isRelation
) => {
    let tempRelations = [...relations]
    tempRelations.push(newRelation)

    setRelations(tempRelations)
    updateDocument(
        "relations", 
        id, 
        {npcs: tempRelations}, 
        setNotification,
        isRelation
    )
}