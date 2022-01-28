import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, provider } from '../helpers/firebase'

const Login = () => {
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
                console.log(user)
            }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }
    return (
        <>
            <button onClick={signIn}>hello</button>
        </>
	)
}

export default Login
