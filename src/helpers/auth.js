// Packages
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
// Firebase
import { auth, provider } from './firebase'
// Helpers
import { getDocument, setDocument } from './firestore'
import { fireBaseError } from './notifications'

async function createUserEntry(user, setNotification) {
	let userDoc = await getDocument("users", user.uid)
	setDocument("users", user.uid, {campaigns: [], displayName: user.displayName}, setNotification, !userDoc)
}

export const getCurrentUser = (setState, functionOnUserLoad = () => {}) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			setState(user.uid)
			functionOnUserLoad(user.uid)
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

export const signOutFunc = (setNotification) => {
	signOut(auth)
		.then(() => {
		}).catch((error) => {
			fireBaseError(setNotification, error.code, error.message)
		})
}
export const signIn = (setNotification) => {
	signInWithPopup(auth, provider)
		.then((result) => {
			createUserEntry(result.user, setNotification)
		}).catch((error) => {
			fireBaseError(setNotification, error.code, error.message)
		})
}