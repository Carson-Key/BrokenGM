// Packages
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Pages
import Relations from '../pages/Relations'
import Relation from '../pages/Relation'
import Login from '../pages/Login'
import Clock from '../pages/Clock'
import Clocks from '../pages/Clocks'
// Components
import ConditionalRender from './ConditionalRender'
import IsLoading from './IsLoading'
// Helpers
import { isCurrentUser } from '../helpers/auth'

const PageRoutes = () => {
    const [isUser, setIsUser] = useState("Loading")

    useEffect(() => {
        isCurrentUser(setIsUser)
    })

    return (
        <IsLoading IsLoading={isUser !== "Loading"}>
            <ConditionalRender 
                condition={isUser}
                returnComponent={
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Login />} />
                    </Routes>
                } 
            >
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/clock/:id' element={<Clock />} />
                    <Route path='/clocks' element={<Clocks />} />
                    <Route path='/relation/:id' element={<Relation />} />
                    <Route path='/relations' element={<Relations />} />
                    <Route path='/' element={<Clocks />} />
                </Routes>
            </ConditionalRender>
        </IsLoading>
	)
}

export default PageRoutes
