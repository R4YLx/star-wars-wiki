function CharactersPagination({ data, onSetPage, page }) {
	console.log(data.results)

	return (
		<div className='d-flex justify-content-between align-items-center p-4'>
			<button
				disabled={!data.previous}
				onClick={() => onSetPage(prevValue => prevValue - 1)}
				type='button'
				className='btn btn-secondary'
			>
				Previous Page
			</button>
			<div className='page'>
				{page} / {Math.ceil(data.count / 10)}
			</div>
			<button
				disabled={!data.next}
				onClick={() => onSetPage(prevValue => prevValue + 1)}
				type='button'
				className='btn btn-secondary'
			>
				Next Page
			</button>
		</div>
	)
}

export default CharactersPagination
