import './Films.css'
import React, { useEffect, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'

export default function Films() {
	const [films, setFilms] = useState('')

	const fetchFilms = async () => {
		const data = await SwapiAPI.getFilms()
		setFilms(data)
	}

	useEffect(() => {
		fetchFilms()
	}, [])

	return (
		<div className='d-flex flex-wrap justify-content-center'>
			{films &&
				films.results.map(film => (
					<div
						key={film.episode_id}
						className='card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
					>
						<div className='card-header d-flex align-items-center'>
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
