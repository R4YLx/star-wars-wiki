import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import FilmDetails from '../../components/FilmDetails'

export default function FilmDetailsPage() {
	const [details, setDetails] = useState([])
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const { id } = useParams()

	// Fetching details about specific film
	const fetchFilmDetails = useCallback(async () => {
		setLoading(true)
		try {
			const res = await SwapiAPI.getSingleFilm(id)

			if (!res.data) {
				throw new Error(res.statusText)
			}

			setDetails(res.data)
			setCharacters(res.data.characters)
			setLoading(false)
		} catch (err) {
			if (err.name === 'AbortError') {
				console.log('Fetch was aborted')
			} else {
				setLoading(false)
				setError('Fetch data could not')
			}
		}
	}, [id])

	useEffect(() => {
		fetchFilmDetails()
	}, [fetchFilmDetails])

	return (
		<>
			{loading && <Loading />}

			<div className='d-flex justify-content-center'>
				{!loading && <FilmDetails details={details} characters={characters} />}
			</div>

			{error && <NotFound error={error} />}
		</>
	)
}
