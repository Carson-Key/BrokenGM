// Packages
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, provider, db } from './firebase'
import { doc, getDoc, setDoc } from "firebase/firestore" 

async function createUserEntry(user) {
	const userDoc = doc(db, "users", user.uid)
	const userDBEntry = await getDoc(userDoc)
	if (!userDBEntry.exists()) {
		await setDoc(userDoc, {
			clocks: [],
			relations: []
		})
	}
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