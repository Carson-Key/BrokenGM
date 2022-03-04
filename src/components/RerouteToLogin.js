// Packages
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
// Components
import ConditionalRender from './ConditionalRender'
// Helpers
import { isCurrentUser } from '../helpers/auth'

const RerouteToLogin = () => {
    const [isUser, setIsUser] = useState(null)

    useEffect(() => {
        isCurrentUser(setIsUser)
    }, [])

    return (
        <ConditionalRender condition={isUser !== null && !isUser}>
            <Navigate to="/login" />
        </ConditionalRender>
	)
}

export default RerouteToLogin
