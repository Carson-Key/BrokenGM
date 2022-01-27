// Packages
import { Routes, Route } from 'react-router-dom'
// Pages
import Clock from '../pages/Clock'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Clock />} />
        </Routes>
	)
}

export default PageRoutes
