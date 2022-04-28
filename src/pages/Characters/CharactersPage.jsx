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

	const [searchParams, setSearchParams] = useSearchParams({
		query: '',
		page: 1,
	})

	const query = searchParams.get('query')
	const page = searchParams.get('page')

	const fetchCharacters = async (query, page) => {
		setLoading(true)
		const data = await SwapiAPI.getCharacters(query, page)
		setCharacters(data.results)
		setData(data)
		setLoading(false)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!searchInput.length) {
			return
		}

		setSearchParams({ query: searchInput, page: 1 })
	}

	useEffect(() => {
		fetchCharacters(query, page)
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

					<CharacterCard characters={characters} />

					{!loading && (
						<Pagination
							onSetSearchParams={setSearchParams}
							data={data}
							query={query}
							page={page}
						/>
					)}
				</>
			)}
		</>
	)
}
