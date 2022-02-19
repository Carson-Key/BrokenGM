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

export const getCurrentUser = (setState, functionOnUserLoad = () => {}) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setState(user.uid)
			functionOnUserLoad()
		} else {
			setState(0)
		}
	})
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