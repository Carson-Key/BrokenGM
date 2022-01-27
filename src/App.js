// Packages
import { BrowserRouter as Router } from 'react-router-dom'
// Components
import PageRoutes from './components/PageRoutes'

const App = () => {
	return (
		<Router>
			<div className="flex flex-col min-h-screen justify-between">
				<PageRoutes />
			</div>
		</Router>
	)
}

export default App
