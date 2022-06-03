// Packages
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Pages
import Relation from '../pages/Relation'
import Login from '../pages/Login'
import Clock from '../pages/Clock'
import Campaigns from '../pages/Campaigns'
import VotingSystem from '../pages/VotingSystem'
// Components
import ConditionalRender from './ConditionalRender'
import IsLoading from './IsLoading'
// Helpers
import { isCurrentUser } from '../helpers/auth'

const PageRoutes = () => {
    const [isUser, setIsUser] = useState("Loading")

    useEffect(() => {
        isCurrentUser(setIsUser)
    }, [])

    return (
        <IsLoading IsLoading={isUser !== "Loading"}>
            <ConditionalRender 
                condition={isUser}
                returnComponent={
                    <Routes>
                        <Route path='/*' element={<Login />} />
                    </Routes>
                } 
            >
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/clock/:id' element={<Clock />} />
                    <Route path='/relation/:id' element={<Relation />} />
                    <Route path='/campaigns' element={<Campaigns />} />
                    <Route path='/votingsystem/:id' element={<VotingSystem />} />
                    <Route path='/' element={<Campaigns />} />
                </Routes>
            </ConditionalRender>
        </IsLoading>
	)
}

export default PageRoutes
