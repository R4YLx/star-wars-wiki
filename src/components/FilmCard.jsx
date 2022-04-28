import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/helpers'

function FilmCard({ films }) {
	return (
		// Maps out film cards with attributes and a link to a more detailed card

		<div className='d-flex flex-wrap justify-content-center animate__animated animate__fadeInUp animate__delay-2s'>
			{films.map(film => (
				<div
					key={film.episode_id}
					className='card film-card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
					style={{ minWidth: '22rem' }}
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

						{/* Link to detailed film card */}

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

export default FilmCard
