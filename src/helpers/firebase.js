// Packages
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDhi2yY3AIrVGPt_3Wb4ssPUR3fvbe8-aA",
  authDomain: "brokengm-bee41.firebaseapp.com",
  projectId: "brokengm-bee41",
  storageBucket: "brokengm-bee41.appspot.com",
  messagingSenderId: "510631621580",
  appId: "1:510631621580:web:219f880e5417383a2ee369"
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export default app