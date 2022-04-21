import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Navigation />

			{/* <Routes>
				<Route path='/' />
			</Routes> */}
		</div>
	)
}

export default App
