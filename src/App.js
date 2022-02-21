// Packages
import { BrowserRouter as Router } from 'react-router-dom'
// Components
import Header from './components/Header'
import PageRoutes from './components/PageRoutes'
// Stores
import ContextStores from './components/ContextStores'

const App = () => {
	return (
		<ContextStores>
			<Router>
				<div className="flex flex-col min-h-screen justify-between">
					<Header />
					<PageRoutes />
				</div>
			</Router>
		</ContextStores>
	)
}

export default App
