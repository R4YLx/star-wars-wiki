import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SwapiAPI from '../services/SwapiAPI'

export default function SearchBar() {
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState(null)
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

	const query = searchParams.get('query')

	const useTheForce = async (resource, searchQuery) => {
		setLoading(true)
		setSearchResult(null)

		const data = await SwapiAPI.getPage(resource, searchQuery)
		setSearchResult(data)

		setLoading(false)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		console.log(searchInput)

		if (!searchInput.length) {
			return
		}
	}

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
						placeholder='Feel the Force...'
					/>
					<button className='btn btn-secondary my-2 my-sm-0' type='submit'>
						Search
					</button>
				</form>
			</div>
		</>
	)
}
