import './FilmsPage.css'
import FilmCard from '../../components/FilmCard'
import { useEffect, useRef, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import SearchFilm from '../../components/SearchFilm'
import SearchPagination from '../../components/SearchPagination'

export default function FilmsPage() {
	const [films, setFilms] = useState([])
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [showFilms, setShowFilms] = useState(true)

	const [searchInput, setSearchInput] = useState([])
	const [searchData, setSearchData] = useState([])

	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

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
		setSearchData([])

		const data = await SwapiAPI.search('films', searchQuery, page)

		setSearchData(data)

		console.log('Data from API:', data)
		console.log('Hits of characters from API', data.results)

		setLoading(false)

		console.log(data)
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
		setShowFilms(false)
	}

	useEffect(() => {
		fetchFilms(page)
	}, [page])

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

			{showFilms ? (
				<>
					<FilmCard films={films} />

					{!loading && (
						<Pagination
							data={data}
							onSetPage={setPage}
							page={page}
							films={films}
						/>
					)}
				</>
			) : null}

			{searchData.results && (
				<>
					<SearchFilm searchData={searchData} query={query} />

					<SearchPagination
						searchData={searchData}
						onSetPage={setPage}
						page={page}
					/>
				</>
			)}
		</>
	)
}
