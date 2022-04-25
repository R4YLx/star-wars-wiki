import './Homepage.css'
import { useEffect, useState } from 'react'
import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

export default function Homepage() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const randomEpisode = Math.floor(Math.random() * (6 - 1) + 1)

	const fetchCrawl = async () => {
		setLoading(true)
		const res = await SwapiAPI.getSingleFilm(randomEpisode)
		setData(res)
		setLoading(false)
	}

	useEffect(() => {
		fetchCrawl()
	}, [])

	return (
		<>
			{loading && <Loading />}
			{data && (
				<Crawl
					style={{ whiteSpace: 'pre-wrap' }}
					title={`Episode ${data.episode_id}`}
					subTitle={data.title}
					text={data.opening_crawl}
				/>
			)}
		</>
	)
}
