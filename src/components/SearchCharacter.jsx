import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/helpers'

function SearchCharacter({ searchData, query }) {
	return (
		<>
			<p className='text-center'>
				Showing {searchData.count} search results for '{query}'
			</p>

			<div className='d-flex flex-wrap justify-content-center'>
				{searchData.results.map((character, index) => (
					<div
						key={index}
						className='card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
					>
						<div className='card-header d-flex align-items-center'>
							<h2>{character.name}</h2>
						</div>
						<div className='card-body'>
							<p className='text-dark'>
								<span>Gender: </span>
								{character.gender}
							</p>
							<hr />
							<p className='text-dark'>
								<span>Born: </span>
								{character.birth_year}
							</p>
							<hr />
							<p className='text-dark'>
								<span>Appears in: </span>
								{character.films.length} film(s)
							</p>
							<Link to={`/characters/${getIdFromUrl(character.url)}`}>
								<button type='button' className='btn btn-primary'>
									Read more
								</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default SearchCharacter
