import './Homepage.css'
import { useEffect, useState } from 'react'
import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'
import SwapiAPI from '../../services/SwapiAPI'

export default function Homepage() {
	const [data, setData] = useState([])

	const randomEpisode = Math.floor(Math.random() * (6 - 1) + 1)

	const fetchCrawl = async () => {
		const res = await SwapiAPI.getSingleFilm(randomEpisode)
		setData(res)
	}

	useEffect(() => {
		fetchCrawl()
	}, [])

	return (
		<>
			<Crawl
				style={{ whiteSpace: 'pre-wrap' }}
				title={`Episode ${data.episode_id}`}
				subTitle={data.title}
				text={data.opening_crawl}
			/>
		</>
	)
}
