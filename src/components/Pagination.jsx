function CharactersPagination({ data, onSetSearchParams, page, query }) {
	const nextPage = () => {
		onSetSearchParams({
			query: query,
			page: Number(page) + 1,
		})

		window.scrollTo(0, 0)
	}

	const prevPage = () => {
		onSetSearchParams({
			query: query,
			page: Number(page) - 1,
		})
		window.scrollTo(0, 0)
	}

	return (
		<div className='d-flex justify-content-between align-items-center p-4 animate__animated animate__fadeIn'>
			<button
				disabled={!data.previous}
				onClick={prevPage}
				type='button'
				className='btn btn-secondary'
				style={{ maxWidth: '8rem' }}
			>
				Previous
			</button>
			<div className='page'>
				{page} / {Math.ceil(data.count / 10)}
			</div>
			<button
				disabled={!data.next}
				onClick={nextPage}
				type='button'
				className='btn btn-secondary'
				style={{ minWidth: '8rem' }}
			>
				Next
			</button>
		</div>
	)
}

export default CharactersPagination
