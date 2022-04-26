import './CharactersPage.css'
import CharactersCard from '../../components/Characters'
import { useEffect, useRef, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'

import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'

import CharactersPagination from '../../components/CharactersPagination'
import SearchCharacter from '../../components/SearchCharacter'
import SearchCharacterPagination from '../../components/SearchCharacterPagination'

export default function Characters() {
	const [characters, setCharacters] = useState([])
	const [loading, setLoading] = useState(false)
	const [showCharacters, setShowCharacters] = useState(true)
	const [data, setData] = useState([])

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

		console.log(data)
	}

	const searchSWAPI = async (searchQuery, page) => {
		setCharacters([])
		setLoading(true)
		setSearchData([])

		const data = await SwapiAPI.search('people', searchQuery, page)

		setSearchData(data)

		console.log('Data from API:', data)
		console.log('Hits of characters from API', data.results)

		setLoading(false)

		console.log(data)
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
				onSearchInputRef={searchInputRef}
			/>
			{loading && <Loading />}

			{showCharacters ? (
				<>
					<CharactersCard characters={characters} />

					{!loading && (
						<CharactersPagination
							data={data}
							onSetPage={setPage}
							page={page}
							characters={characters}
						/>
					)}
				</>
			) : null}

			{searchData.results && (
				<>
					<SearchCharacter searchData={searchData} query={query} />

					<SearchCharacterPagination
						searchData={searchData}
						onSetPage={setPage}
						page={page}
					/>
				</>
			)}
		</>
	)
}
