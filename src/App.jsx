import './App.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage/Homepage'
import CharactersPage from './pages/Characters/CharactersPage'
import CharacterDetailsPage from './pages/CharacterDetails/CharacterDetailsPage'
import FilmsPage from './pages/Films/FilmsPage'
import FilmDetailsPage from './pages/FilmDetails/FilmDetailsPage'
import NotFound from './pages/NotFound/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<Navigation />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/characters/' element={<CharactersPage />} />
				<Route path='/films/' element={<FilmsPage />} />
				<Route path='/characters/:id' element={<CharacterDetailsPage />} />
				<Route path='/films/:id' element={<FilmDetailsPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
