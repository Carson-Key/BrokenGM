// Packages
import { Routes, Route } from 'react-router-dom'
// Pages
import Login from '../pages/Login'
import Clock from '../pages/Clock'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/clock' element={<Clock />} />
        </Routes>
	)
}

export default PageRoutes
