// Packages
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// UI
import Banner from '../ui/Banner'
import Navigation from '../ui/Navigation'
// Contexts
import { NotificationContext } from '../contexts/Notification'
// Helpers
import { signIn, signOutFunc, isCurrentUser } from '../helpers/auth'

const Header = () => {
	let navigate = useNavigate()
	const setNotification = useContext(NotificationContext)[1]
    const [drawerMenuIsOpen, setDrawerMenuIsOpen] = useState(false)
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
	const [authButtonText, setAuthButtontext] = useState("Login")

	useEffect(() => {
		isCurrentUser(setIsUserLoggedIn)
		if (isUserLoggedIn) {
			setAuthButtontext("Signout")
		} else {
			setAuthButtontext("Login")
		}
	}, [isUserLoggedIn, navigate])

	const invokeAuthFunction = () => {
		if (authButtonText === "Signout") {
			signOutFunc(setNotification)
			navigate("/login")
		} else {
			signIn(setNotification)
			navigate("/")
		}
	}

    const toggleDrawerMenu = () => {
        setDrawerMenuIsOpen(!drawerMenuIsOpen)
    }
	const closeDrawerMenu = () => {
        setDrawerMenuIsOpen(false)
    }

	return (
		<header className="flex justify-between w-full h-14 text-white bg-purple-500 lg:h-20 lg:text-2xl xl:h-24 xl:text-3xl 2xl:h-28 2xl:text-4xl z-30">
			<div className="flex w-full">
				<Banner 
					toggleDrawerMenu={toggleDrawerMenu} 
					closeDrawerMenu={closeDrawerMenu} 
					drawerMenuIsOpen={drawerMenuIsOpen} 
				/>
				<Navigation 
					closeDrawerMenu={closeDrawerMenu} 
					drawerMenuIsOpen={drawerMenuIsOpen}
				/>
			</div>
			<button onClick={invokeAuthFunction} className="relative text-black bg-white h-12 my-auto rounded-md px-2 py-1 right-0 mr-2 lg:relative lg:right-0">{authButtonText}</button>
		</header>
	)
}

export default Header