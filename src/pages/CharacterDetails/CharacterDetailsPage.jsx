import './CharacterDetailsPage.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import CharacterDetails from '../../components/CharacterDetails'

export default function CharactersDetails() {
	const [details, setDetails] = useState([])
	const [films, setFilms] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const { id } = useParams()

	// Fetching details about specific character
	const fetchCharacterDetails = useCallback(async () => {
		setLoading(true)
		try {
			const res = await SwapiAPI.getSingleCharacter(id)
			setDetails(res.data)
			setFilms(res.data.films)
			setLoading(false)
		} catch (err) {
			if (err.name === 'AbortError') {
				console.log('Fetch was aborted')
			} else {
				setDetails(null)
				setLoading(false)
				setError('Fetch data could not')
			}
		}
	}, [id])

	useEffect(() => {
		fetchCharacterDetails()
	}, [fetchCharacterDetails])

	return (
		<>
			{loading && <Loading />}

			<div className='d-flex justify-content-center'>
				{details && <CharacterDetails details={details} films={films} />}
			</div>

			{error && <NotFound error={error} />}
		</>
	)
}
