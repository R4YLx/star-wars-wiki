import './FilmsPage.css'
import FilmCard from '../../components/FilmCard'
import { useEffect, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'

export default function FilmsPage() {
	const [films, setFilms] = useState([])
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const [searchInput, setSearchInput] = useState([])

	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get('query')

	const fetchFilms = async page => {
		setLoading(true)
		const data = await SwapiAPI.getFilms(page)
		setFilms(data.results)
		setData(data)
		setLoading(false)
	}

	const searchSWAPI = async (searchQuery, page) => {
		setFilms([])
		setLoading(true)

		const data = await SwapiAPI.search('films', searchQuery, page)

		setFilms(data.results)
		setData(data)
		setLoading(false)
	}

	const handleSubmit = async e => {
		setFilms([])
		e.preventDefault()

		if (!searchInput.length) {
			return
		}

		setPage(1)
		searchSWAPI(searchInput, 1)
		setSearchParams({ query: searchInput })
	}

	useEffect(() => {
		fetchFilms(page)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!query) {
			return
		}

		searchSWAPI(query, page)
	}, [query, page])

	return (
		<>
			<SearchBar
				onHandleSubmit={handleSubmit}
				onSetSearchInput={setSearchInput}
				onSearchInput={searchInput}
			/>
			{loading && <Loading />}

			{data && (
				<>
					{query && (
						<p className='text-center'>
							Showing {data.count} search result(s) for '{query}'
						</p>
					)}

					<FilmCard films={films} />

					{!loading && (
						<Pagination data={data} onSetPage={setPage} page={page} />
					)}
				</>
			)}
		</>
	)
}
