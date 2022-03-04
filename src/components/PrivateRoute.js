// Packages
import { Route } from 'react-router-dom'

const PrivateRoute = (props) => {
    const { children, path } = props

    return (
        <Route path={path} element={children} />
	)
}

export default PrivateRoute
