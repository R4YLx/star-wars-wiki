import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SwapiAPI from '../../services/SwapiAPI'

export default function Homepage() {
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState(null)
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

	const query = searchParams.get('query')

	const useTheForce = async (searchQuery, page = 0) => {
		setLoading(true)
		setSearchResult(null)

		const data = await SwapiAPI.getPage(searchQuery, page)
		setSearchResult(data)

		setLoading(false)
	}

	return (
		<>
			<div className='d-flex justify-content-center mt-4'>
				<form className='d-flex'>
					<input
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
