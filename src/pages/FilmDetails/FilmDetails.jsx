import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getIdFromUrl } from '../../helpers/helpers'
import NotFound from '../NotFound/NotFound'

export default function FilmDetails() {
	const [details, setDetails] = useState([])
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams()
	const navigate = useNavigate()

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
				{typeof details === 'object' && (
					<div className='card m-4 character-details-card'>
						<h3 className='card-header text-dark'>{details.title}</h3>
						<div className='card-body'>
							<h5 className='card-title text-dark'>Attributes</h5>
						</div>
						<div className='card-body '>
							<p className='card-text text-dark'>
								<span className='detail'> Episode: </span>
								{details.episode_id}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Director(s): </span>
								{details.director}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Producer(s): </span>
								{details.producer}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Release date: </span>
								{details.release_date}
							</p>
						</div>
						<div className='card-body'>
							<h5 className='card-title text-dark'>Links</h5>
							<h6 className='card-subtitle text-muted'>Characters</h6>
						</div>
						<ul className='list-group list-group-flush'>
							{characters.map(character => (
								<Link
									key={getIdFromUrl(character)}
									to={`/characters/${getIdFromUrl(character)}`}
								>
									<li className='list-group-item'>
										Character {getIdFromUrl(character)}
									</li>
								</Link>
							))}
						</ul>

						<div className='m-2 pt-4'>
							<button
								type='button'
								className='btn btn-primary'
								onClick={() => navigate(-1)}
							>
								Go back
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
