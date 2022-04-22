import { useEffect, useState } from 'react'
import './Characters.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

export default function Characters() {
	const [characters, setCharacters] = useState()
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)

	const fetchCharacters = async () => {
		setLoading(true)
		const data = await SwapiAPI.getCharacters()
		setCharacters(data)
		setPage(0)
		setLoading(false)
	}

	useEffect(() => {
		fetchCharacters()
	}, [])

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center'>
				{loading && <Loading />}

				{characters &&
					characters.results.map((character, index) => (
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
									{character.films.length} films
								</p>
								<button type='button' className='btn btn-primary'>
									Read more
								</button>
							</div>
						</div>
					))}
			</div>
			<div className='d-flex justify-content-between align-items-center p-4'>
				<button
					onClick={() => setPage(prevValue => prevValue - 1)}
					type='button'
					className='btn btn-secondary'
				>
					Previous Page
				</button>
				<div className='page'>{page + 1}</div>
				<button
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
