// Packages
import { useState } from 'react'
// UI
import Banner from './Banner'
import Navigation from './Navigation'

const Header = () => {
    const [drawerMenuIsOpen, setDrawerMenuIsOpen] = useState(false)

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
			<button className="relative right-0 mr-2 lg:relative lg:right-0">Login</button>
		</header>
	)
}

export default Header