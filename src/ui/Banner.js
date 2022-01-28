// Packages
import { MdMenu } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
// Assets
import Logo from '../assets/logo.svg'

const Banner = (props) => {
	const { toggleDrawerMenu, drawerMenuIsOpen, closeDrawerMenu } = props

	return (
		<>
			<button 
				onClick={toggleDrawerMenu} 
				aria-hidden='true'
				aria-expanded={drawerMenuIsOpen}
				aria-label="Mobile Navigation Button" 
				className="lg:hidden"
			>
				<MdMenu className="h-14 text-2xl mx-2"/>
			</button>
			<NavLink to="/" className="flex justify-center my-auto mx-auto lg:mx-3"  onClick={closeDrawerMenu}>
				<h1 className="my-auto text-lg font-helvetica lg:text-2xl xl:text-3xl 2xl:text-4xl" aria-label="Title Broken">Broken</h1>
				<img src={Logo} className="h-10 ml-1 lg:h-14 xl:h-16 2xl:h-20" alt="Brass colored Node.js hexagon logo with brass colored React logo inside, which has the nucleus replaced with a brass key " />
				<h1 className="my-auto text-lg font-helvetica ml-1 lg:text-2xl xl:text-3xl 2xl:text-4xl"  aria-label="Title GM">GM</h1>
			</NavLink>
		</>
	)
}

export default Banner
