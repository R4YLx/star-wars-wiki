import './CharactersPage.css'
import CharacterCard from '../../components/CharacterCard'
import { useEffect, useRef, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import SearchCharacter from '../../components/SearchCharacter'
import SearchPagination from '../../components/SearchPagination'

export default function CharactersPage() {
	const [characters, setCharacters] = useState([])
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [showCharacters, setShowCharacters] = useState(true)

	const [searchInput, setSearchInput] = useState([])
	const [searchData, setSearchData] = useState([])

	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

	const query = searchParams.get('query')

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
		setSearchData([])

		const data = await SwapiAPI.search('people', searchQuery, page)

		setSearchData(data)

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
		setShowCharacters(false)
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

			{showCharacters ? (
				<>
					<CharacterCard characters={characters} />

					{!loading && (
						<Pagination data={data} onSetPage={setPage} page={page} />
					)}
				</>
			) : null}

			{searchData.results && (
				<>
					<SearchCharacter searchData={searchData} query={query} />

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
