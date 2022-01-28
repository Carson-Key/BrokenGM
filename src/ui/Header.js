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
		<header className="flex relative h-14 z-40 text-white bg-purple-500 lg:h-20 lg:text-2xl xl:h-24 xl:text-3xl 2xl:h-28 2xl:text-4xl">
			<Banner 
				toggleDrawerMenu={toggleDrawerMenu} 
				closeDrawerMenu={closeDrawerMenu} 
				drawerMenuIsOpen={drawerMenuIsOpen} 
			/>
			<Navigation 
				closeDrawerMenu={closeDrawerMenu} 
				drawerMenuIsOpen={drawerMenuIsOpen}
			/>
		</header>
	)
}

export default Header