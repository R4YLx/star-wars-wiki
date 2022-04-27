import './CharactersPage.css'
import CharacterCard from '../../components/CharacterCard'
import { useEffect, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'

export default function CharactersPage() {
	const [characters, setCharacters] = useState([])
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const [searchInput, setSearchInput] = useState([])

	const [page, setPage] = useState(1)

	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get('search')
	// const pages = searchParams.get('page')

	const fetchCharacters = async page => {
		setLoading(true)
		const data = await SwapiAPI.getCharacters(page)
		setCharacters(data.results)
		setData(data)
		setLoading(false)
	}

	const searchSWAPI = async (searchQuery, page) => {
		setCharacters([])
		setLoading(true)

		const data = await SwapiAPI.search('people', searchQuery, page)

		setCharacters(data.results)
		setData(data)

		setLoading(false)
	}

	const handleSubmit = async e => {
		setCharacters([])
		e.preventDefault()

		if (!searchInput.length) {
			return
		}

		setPage(1)
		searchSWAPI(searchInput, 1)
		setSearchParams({ query: searchInput })
	}

	useEffect(() => {
		fetchCharacters(page)
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

			{data && (
				<>
					{query && (
						<p className='text-center'>
							Showing {data.count} search results for '{query}'
						</p>
					)}

					<CharacterCard characters={characters} />

					{!loading && (
						<Pagination data={data} onSetPage={setPage} page={page} />
					)}
				</>
			)}
		</>
	)
}
