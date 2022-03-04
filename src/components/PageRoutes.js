// Packages
import { Routes, Route } from 'react-router-dom'
// Pages
import Relations from '../pages/Relations'
import Relation from '../pages/Relation'
import Login from '../pages/Login'
import Clock from '../pages/Clock'
import Clocks from '../pages/Clocks'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/clock/:id' element={<Clock />} />
            <Route path='/clocks' element={<Clocks />} />
            <Route path='/relation/:id' element={<Relation />} />
            <Route path='/relations' element={<Relations />} />
            <Route path='/' element={<Clocks />} />
        </Routes>
	)
}

export default PageRoutes
