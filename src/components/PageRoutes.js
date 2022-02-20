// Packages
import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
// Pages
import Relations from '../pages/Relations'
import Login from '../pages/Login'
import Clock from '../pages/Clock'
import Clocks from '../pages/Clocks'
// Contexts
import { NotificationContext } from '../contexts/Notification'

const PageRoutes = () => {
    const setNotification = useContext(NotificationContext)[1]

    useEffect(() => {
        setNotification(
            {
                type: 'SET_NOTIFICATION', 
                payload: {occurs: true, message: "Hello", type: "error"}
            }
        )
    }, [])

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/clock/:id' element={<Clock />} />
            <Route path='/clocks' element={<Clocks />} />
            <Route path='/relations' element={<Relations />} />
            <Route path='/' element={<Clocks />} />
        </Routes>
	)
}

export default PageRoutes
