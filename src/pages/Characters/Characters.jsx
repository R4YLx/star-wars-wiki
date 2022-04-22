import React, { useEffect, useState } from 'react'
import './Characters.css'
import SwapiAPI from '../../services/SwapiAPI'

export default function Characters() {
	const [characters, setCharacters] = useState('')

	const fetchCharacters = async () => {
		const data = await SwapiAPI.getCharacters()
		setCharacters(data)
	}

	useEffect(() => {
		fetchCharacters()
	}, [])

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center'>
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
			<div className='d-flex justify-content-between p-4'>
				<button type='button' className='btn btn-secondary'>
					Previous Page
				</button>
				<button type='button' className='btn btn-secondary'>
					Next Page
				</button>
			</div>
		</>
	)
}
