// Packages
import { doc, getDoc, setDoc } from "firebase/firestore" 
// Firebase
import { db } from './firebase'
// Helpers
import { fireBaseError } from "./notifications"

export async function getDocument(collection, document, setNotification) {
	try {
		const userDoc = doc(db, collection, document)
		const userDBEntry = await getDoc(userDoc)
	
		if (userDBEntry.exists()) {
			return userDBEntry
		} else {
			return null
		}
	} catch (error) {
		fireBaseError(setNotification, error.code, error.message)
		return null
	}
}
export async function setDocument(collection, document, dataToAdd, setNotification, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			await setDoc(userDoc, dataToAdd)
		}
	} catch (error) {
		fireBaseError(setNotification, error.code, error.message)
	}
}
export async function updateDocument(collection, document, dataToAdd, setNotification, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			await setDoc(userDoc, dataToAdd, { merge: true })
		}
	} catch (error) {
		fireBaseError(setNotification, error.code, error.message)
	}
}