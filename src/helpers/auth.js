// Packages
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, provider } from './firebase'

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
		}).catch((error) => {
		})
}