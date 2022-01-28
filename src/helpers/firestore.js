import { db } from './firebase'
import { doc, getDoc, setDoc } from "firebase/firestore" 

export async function getDocument(collection, document) {
	const userDoc = doc(db, collection, document)
	const userDBEntry = await getDoc(userDoc)

	if (userDBEntry.exists()) {
		return userDBEntry
	} else {
        return null
    }
}
export async function setDocument(collection, document, dataToAdd, documentExsists = true) {
    const userDoc = doc(db, collection, document)

	if (documentExsists) {
		await setDoc(userDoc, dataToAdd)
	}
}