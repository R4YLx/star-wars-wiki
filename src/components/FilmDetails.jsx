import { getIdFromUrl } from '../helpers/helpers'
import { Link, useNavigate } from 'react-router-dom'

function FilmDetails({ details, characters }) {
	const navigate = useNavigate()
	return (
		// Detailed card with film info and links to characters that appears in the film

		<div className='card m-4 character-details-card animate__animated animate__fadeIn'>
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

			{/* list with appearing characters in the film */}
			<ul className='list-group list-group-flush'>
				{characters &&
					characters.map(character => (
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

			{/* back button  */}
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
	)
}

export default FilmDetails
