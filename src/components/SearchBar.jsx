import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SwapiAPI from '../services/SwapiAPI'

export default function SearchBar() {
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState(null)
	const [page, setPage] = useState(0)
	const [hits, setHits] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

	const query = searchParams.get('query')

	const searchSWAPI = async (resource, searchQuery, page) => {
		setLoading(true)
		setSearchResult(null)
		const data = await SwapiAPI.search(resource, searchQuery, page)
		setSearchResult(data)
		setLoading(false)
		setHits(data.results)

		console.log(data)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		console.log(searchInput)

		if (!searchInput.length) {
			return
		}

		setSearchParams({ query: searchInput })
	}

	useEffect(() => {
		if (!query) {
			setSearchInput('')
			setSearchResult(null)
			return
		}

		setSearchInput(query)
		searchSWAPI(query, page)

		console.log(query)
		console.log(page)
	}, [query, page])

	return (
		<>
			<div className='d-flex justify-content-center m-4'>
				<form className='d-flex' onSubmit={handleSubmit}>
					<input
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
						ref={searchInputRef}
						className='form-control me-sm-2'
						type='text'
						placeholder='Use the Force...'
					/>
					<button className='btn btn-secondary my-2 my-sm-0' type='submit'>
						Search
					</button>
				</form>
			</div>
		</>
	)
}
