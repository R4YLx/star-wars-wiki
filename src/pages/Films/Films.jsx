import './Films.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Films() {
	const [films, setFilms] = useState([])

	const getFilms = async () => {
		try {
			const res = await axios.get('https://swapi.dev/api/films')
			const data = res.data.results
			setFilms(data)

			return data
		} catch (err) {
			return { message: err.message }
		}
	}

	useEffect(() => {
		getFilms()
	}, [])

	return (
		<div className='d-flex flex-wrap justify-content-center'>
			{films.map(film => (
				<div key={film.episode_id} className='card border-secondary m-3 col-3'>
					<div className='card-header'>
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
						<button type='button' className='btn btn-primary'>
							Read more
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
