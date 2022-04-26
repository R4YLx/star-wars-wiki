import './Characters.css'
import { useEffect, useRef, useState } from 'react'
import SwapiAPI from '../../services/SwapiAPI'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import { useSearchParams } from 'react-router-dom'
import { getIdFromUrl } from '../../helpers/helpers'

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
					<div className='d-flex flex-wrap justify-content-center'>
						{characters.map((character, index) => (
							<div
								key={index}
								className='card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
							>
								<div className='card-header d-flex align-items-center'>
									<h2>{character.name}</h2>
								</div>
								<div className='card-body'>
									<p className='text-dark'>
										<span>Gender: </span>
										{character.gender}
									</p>
									<hr />
									<p className='text-dark'>
										<span>Born: </span>
										{character.birth_year}
									</p>
									<hr />
									<p className='text-dark'>
										<span>Appears in: </span>
										{character.films.length} film(s)
									</p>
									<Link to={`/characters/${index + 1}`}>
										<button type='button' className='btn btn-primary'>
											Read more
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>

					{!loading && (
						<div className='d-flex justify-content-between align-items-center p-4'>
							<button
								disabled={!data.previous}
								onClick={() => setPage(prevValue => prevValue - 1)}
								type='button'
								className='btn btn-secondary'
							>
								Previous Page
							</button>
							<div className='page'>{page}</div>
							<button
								disabled={!data.next}
								onClick={() => setPage(prevValue => prevValue + 1)}
								type='button'
								className='btn btn-secondary'
							>
								Next Page
							</button>
						</div>
					)}
				</>
			) : null}

			{searchData.results && (
				<>
					<p className='text-center'>
						Showing {searchData.count} search results for '{query}'
					</p>

					<div className='d-flex flex-wrap justify-content-center'>
						{searchData.results.map((character, index) => (
							<div
								key={index}
								className='card border-secondary m-3 col-md-3 col-sm-4 col-xs-12'
							>
								<div className='card-header d-flex align-items-center'>
									<h2>{character.name}</h2>
								</div>
								<div className='card-body'>
									<p className='text-dark'>
										<span>Gender: </span>
										{character.gender}
									</p>
									<hr />
									<p className='text-dark'>
										<span>Born: </span>
										{character.birth_year}
									</p>
									<hr />
									<p className='text-dark'>
										<span>Appears in: </span>
										{character.films.length} film(s)
									</p>
									<Link to={`/characters/${getIdFromUrl(character.url)}`}>
										<button type='button' className='btn btn-primary'>
											Read more
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>

					<div className='d-flex justify-content-between align-items-center p-4'>
						<button
							disabled={!searchData.previous}
							onClick={() => setPage(prevValue => prevValue - 1)}
							type='button'
							className='btn btn-secondary'
						>
							Previous Page
						</button>
						<div className='page'>{page}</div>
						<button
							disabled={!searchData.next}
							onClick={() => setPage(prevValue => prevValue + 1)}
							type='button'
							className='btn btn-secondary'
						>
							Next Page
						</button>
					</div>
				</>
			)}
		</>
	)
}
