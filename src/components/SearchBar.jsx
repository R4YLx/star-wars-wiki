export default function SearchBar({
	onHandleSubmit,
	onSetSearchInput,
	onSearchInput,
}) {
	return (
		<>
			<div className='d-flex justify-content-center m-4 animate__animated animate__fadeIn'>
				<form className='d-flex align-items-center' onSubmit={onHandleSubmit}>
					<input
						onChange={e => onSetSearchInput(e.target.value)}
						value={onSearchInput}
						className='form-control me-sm-2 align-items-stretch'
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
