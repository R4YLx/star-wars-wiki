function SearchCharacterPagination({ searchData, onSetPage, page }) {
	return (
		<div className='d-flex justify-content-between align-items-center p-4'>
			<button
				disabled={!searchData.previous}
				onClick={() => onSetPage(prevValue => prevValue - 1)}
				type='button'
				className='btn btn-secondary'
			>
				Previous Page
			</button>
			<div className='page'>
				{page} / {Math.ceil(searchData.count / searchData.results.length)}
			</div>
			<button
				disabled={!searchData.next}
				onClick={() => onSetPage(prevValue => prevValue + 1)}
				type='button'
				className='btn btn-secondary'
			>
				Next Page
			</button>
		</div>
	)
}

export default SearchCharacterPagination
