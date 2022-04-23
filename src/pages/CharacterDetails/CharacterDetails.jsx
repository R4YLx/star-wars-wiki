import './CharacterDetails.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getIdFromUrl } from '../../helpers/helpers'

export default function CharactersDetails() {
	const [details, setDetails] = useState([])
	const [films, setFilms] = useState([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams()
	const navigate = useNavigate()

	const fetchCharacterDetails = async () => {
		setLoading(true)
		const data = await SwapiAPI.getSingleCharacter(id)
		setDetails(data)
		setFilms(data.films)
		setLoading(false)
	}

	console.log(films)

	useEffect(() => {
		fetchCharacterDetails()
	}, [])

	return (
		<>
			<div className='d-flex  justify-content-center'>
				{loading && <Loading />}
				{details && (
					<div className='card m-4 character-details-card'>
						<h3 className='card-header text-dark'>{details.name}</h3>
						<div className='card-body'>
							<h5 className='card-title text-dark'>Attributes</h5>
						</div>
						<div className='card-body '>
							<p className='card-text text-dark'>
								<span className='detail'> Gender: </span>
								{details.gender}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Birth year: </span>
								{details.birth_year}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Height: </span>
								{details.height} cm
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Mass: </span>
								{details.mass} kg
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Hair color: </span>
								{details.hair_color}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Skin color: </span>
								{details.skin_color}
							</p>
							<p className='card-text text-dark'>
								<span className='detail'> Eye color: </span>
								{details.eye_color}
							</p>
						</div>
						<div className='card-body'>
							<h5 className='card-title text-dark'>Links</h5>
							<h6 className='card-subtitle text-muted'>Films</h6>
						</div>
						<ul className='list-group list-group-flush'>
							{films.map(film => (
								<Link
									key={getIdFromUrl(film)}
									to={`/films/${getIdFromUrl(film)}`}
								>
									<li className='list-group-item'>Film {getIdFromUrl(film)}</li>
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
