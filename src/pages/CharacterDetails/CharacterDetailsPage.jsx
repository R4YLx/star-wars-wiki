import './CharacterDetails.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import CharacterDetails from '../../components/CharacterDetails'

export default function CharactersDetails() {
	const [details, setDetails] = useState([])
	const [films, setFilms] = useState([])

	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	const fetchCharacterDetails = async () => {
		setLoading(true)
		setDetails([])
		const data = await SwapiAPI.getSingleCharacter(id)
		setDetails(data)
		setFilms(data.films)
		setLoading(false)
	}

	useEffect(() => {
		fetchCharacterDetails()
	}, [])

	return (
		<>
			{details === 404 && <NotFound />}
			{loading && <Loading />}

			<div className='d-flex justify-content-center'>
				{!loading && <CharacterDetails details={details} films={films} />}
			</div>
		</>
	)
}
