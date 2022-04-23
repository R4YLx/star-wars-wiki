import './Films.css'
import { useEffect, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../../helpers/helpers'

export default function Films() {
	const [films, setFilms] = useState('')
	const [loading, setLoading] = useState(false)

	const fetchFilms = async () => {
		setLoading(true)
		const data = await SwapiAPI.getFilms()
		setFilms(data)
		setLoading(false)
		console.log(films)
	}

	useEffect(() => {
		fetchFilms()
	}, [])

	return (
		<div className='d-flex flex-wrap justify-content-center'>
			{loading && <Loading />}

			{films &&
				films.results.map(film => (
					<div
						key={film.episode_id}
						className='card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
					>
						<div className='card-header film-card-header d-flex align-items-center'>
							<h2>{film.title}</h2>
						</div>
						<div className='card-body'>
							<p className='text-dark'>
								<span>Episode: </span>
								{film.episode_id}
							</p>
							<hr />
							<p className='text-dark'>
								<span>Released: </span>
								{film.release_date}
							</p>
							<hr />
							<p className='text-dark'>
								<span>Characters: </span>
								{film.characters.length}
							</p>

							<Link to={`/films/${getIdFromUrl(film.url)}`}>
								<button type='button' className='btn btn-primary'>
									Read more
								</button>
							</Link>
						</div>
					</div>
				))}
		</div>
	)
}
