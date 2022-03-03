// Helper
import { capitalizeFirstLetter } from "./misc"
import { updateDocument } from './firestore'

export const formatCharacterName = (name) => {
    let brokenName = name.split('_')
    brokenName.forEach((word, i) => {
        const capitalizedWord = capitalizeFirstLetter(word)
        brokenName[i] = capitalizedWord
    })
    const joinedName = brokenName.join(' ')

    return joinedName
}
export const changeRelationValue = (
    value, index, character, relations, setRelations, setNotification, id, isRelation
) => {
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
}