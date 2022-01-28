// Packages
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
// Firebase
import { auth, provider } from './firebase'
// Helpers
import { getDocument, setDocument } from './firestore'

async function createUserEntry(user) {
	let userDoc = await getDocument("users", user.uid)
	setDocument("users", user.uid, {clocks: [], relations: []}, !userDoc)
}

export const isCurrentUser = (setState) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setState(true)
		} else {
			setState(false)
		}
	})
}

export const signOutFunc = () => {
	signOut(auth).then(() => {
	}).catch((error) => {
		console.log(error)
	})
}
export const signIn = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			createUserEntry(result.user)
		}).catch((error) => {
		})
}