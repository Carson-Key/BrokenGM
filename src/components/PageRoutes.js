// Packages
import { Routes, Route } from 'react-router-dom'
// Pages
import Relations from '../pages/Relations'
import Clock from '../pages/Clock'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Relations />} />
            <Route path='/clock/:id' element={<Clock />} />
            <Route path='/' element={<Clock />} />
        </Routes>
	)
}

export default PageRoutes
