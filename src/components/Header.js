// Packages
import { useEffect, useState } from 'react'
// UI
import Banner from '../ui/Banner'
import Navigation from '../ui/Navigation'
// Helpers
import { signIn, signOutFunc, isCurrentUser } from '../helpers/auth'

const Header = () => {
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
	}, [isUserLoggedIn])

	const invokeAuthFunction = () => {
		if (authButtonText === "Signout") {
			signOutFunc()
		} else {
			signIn()
		}
	}

    const toggleDrawerMenu = () => {
        setDrawerMenuIsOpen(!drawerMenuIsOpen)
    }
	const closeDrawerMenu = () => {
        setDrawerMenuIsOpen(false)
    }

	return (
		<header className="flex justify-between w-full h-14 text-white bg-purple-500 lg:h-20 lg:text-2xl xl:h-24 xl:text-3xl 2xl:h-28 2xl:text-4xl">
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