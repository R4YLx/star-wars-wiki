import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Characters.css'

export default function Characters() {
	const [characters, setCharacters] = useState([])

	const getCharacters = async () => {
		try {
			const res = await axios.get('https://swapi.dev/api/people')
			const data = res.data.results

			setCharacters(data)

			return data
		} catch (err) {
			return { message: err.message }
		}
	}

	useEffect(() => {
		getCharacters()
	}, [])

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center'>
				{characters.map((character, index) => (
					<div key={index} className='card border-secondary m-3 col-3'>
						<div className='card-header'>
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
