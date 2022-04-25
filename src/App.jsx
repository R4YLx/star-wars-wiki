import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage/Homepage'
import Characters from './pages/Characters/Characters'
import CharacterDetails from './pages/CharacterDetails/CharacterDetails'
import Films from './pages/Films/Films'
import FilmDetails from './pages/FilmDetails/FilmDetails'
import NotFound from './pages/NotFound/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Navigation />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/characters/' element={<Characters />} />
				<Route path='/films/' element={<Films />} />
				<Route path='/characters/:id' element={<CharacterDetails />} />
				<Route path='/films/:id' element={<FilmDetails />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
