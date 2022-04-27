import './Homepage.css'
import { useEffect, useState } from 'react'
import Crawl from 'react-star-wars-crawl'
import 'react-star-wars-crawl/lib/index.css'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import NotFound from '../NotFound/NotFound'

export default function Homepage() {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const randomEpisode = Math.floor(Math.random() * (6 - 1) + 1)

	const fetchCrawl = async () => {
		setLoading(true)
		try {
			const res = await SwapiAPI.getSingleFilm(randomEpisode)

			if (!res.data) {
				throw new Error(res.statusText)
			}

			setData(res.data)
			setLoading(false)
		} catch (err) {
			if (err.name === 'AbortError') {
				console.log('Fetch was aborted')
			} else {
				setLoading(false)
				setError('Fetch data could not')
			}
		}
	}

	useEffect(() => {
		fetchCrawl()
	}, [])

	return (
		<>
			{data === 404 && <NotFound />}
			{loading && <Loading />}
			{data && (
				<Crawl
					style={{ whiteSpace: 'pre-wrap' }}
					title={`Episode ${data.episode_id}`}
					subTitle={data.title}
					text={data.opening_crawl}
				/>
			)}

			{error && <NotFound error={error} />}
		</>
	)
}
