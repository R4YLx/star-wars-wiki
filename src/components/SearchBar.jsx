export default function SearchBar({
	onHandleSubmit,
	onSetSearchInput,
	onSearchInput,
	onSearchInputRef,
}) {
	return (
		<>
			<div className='d-flex justify-content-center m-4'>
				<form className='d-flex' onSubmit={onHandleSubmit}>
					<input
						onChange={e => onSetSearchInput(e.target.value)}
						value={onSearchInput}
						ref={onSearchInputRef}
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
