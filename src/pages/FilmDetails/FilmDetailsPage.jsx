import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NotFound from '../NotFound/NotFound'
import FilmDetails from '../../components/FilmDetails'

export default function FilmDetailsPage() {
	const [details, setDetails] = useState([])
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	const fetchFilmDetails = async () => {
		setLoading(true)
		setDetails([])
		const data = await SwapiAPI.getSingleFilm(id)

		setDetails(data)
		setCharacters(data.characters)
		setLoading(false)

		console.log(data)
	}

	useEffect(() => {
		fetchFilmDetails()
	}, [])

	return (
		<>
			{details === 404 && <NotFound />}
			{loading && <Loading />}
			<div className='d-flex justify-content-center'>
				{!loading && <FilmDetails details={details} characters={characters} />}
			</div>
		</>
	)
}
