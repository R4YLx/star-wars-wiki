import { useNavigate, Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/helpers'

function CharacterDetails({ details, films }) {
	const navigate = useNavigate()
	return (
		// Detailed card with character info and links to films that the character appears in

		<div className='card m-4 character-details-card animate__animated animate__fadeIn'>
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

			{/* list with films the character appears in */}
			<ul className='list-group list-group-flush'>
				{films &&
					films.map(film => (
						<Link key={getIdFromUrl(film)} to={`/films/${getIdFromUrl(film)}`}>
							<li className='list-group-item'>Film {getIdFromUrl(film)}</li>
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

export default CharacterDetails
