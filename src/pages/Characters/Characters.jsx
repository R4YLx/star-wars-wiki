import './Characters.css'
import { useEffect, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

export default function Characters() {
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)

	const fetchCharacters = async () => {
		setLoading(true)
		const data = await SwapiAPI.getCharacters(page)
		setCharacters(data.results)
		setLoading(false)
	}

	useEffect(() => {
		fetchCharacters()
	}, [page])

	return (
		<>
			{/* <SearchBar /> */}
			{loading && <Loading />}

			<div className='d-flex flex-wrap justify-content-center'>
				{characters &&
					characters.map((character, index) => (
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
								<Link to={`/characters/${index + 1}`}>
									<button type='button' className='btn btn-primary'>
										Read more
									</button>
								</Link>
							</div>
						</div>
					))}
			</div>
			<div className='d-flex justify-content-between align-items-center p-4'>
				<button
					disabled={page === 1}
					onClick={() => setPage(prevValue => prevValue - 1)}
					type='button'
					className='btn btn-secondary'
				>
					Previous Page
				</button>
				<div className='page'>{page}</div>
				<button
					disabled={characters.length < 9}
					onClick={() => setPage(prevValue => prevValue + 1)}
					type='button'
					className='btn btn-secondary'
				>
					Next Page
				</button>
			</div>
		</>
	)
}
