import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage/Homepage'
import Characters from './pages/Characters/Characters'
import Films from './pages/Films/Films'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Navigation />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/characters' element={<Characters />} />
				<Route path='/films' element={<Films />} />
			</Routes>
		</div>
	)
}

export default App
