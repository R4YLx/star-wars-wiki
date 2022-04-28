import notFoundImg from '../../assets/404.gif'

export default function NotFound({ error }) {
	return (
		<>
			{/* Error catches */}

			{error && (
				<div className='alert alert-danger text-center' role='alert'>
					{error}
				</div>
			)}

			{!error && (
				<div className='alert alert-danger text-center' role='alert'>
					The page you are looking for doesn't exists
				</div>
			)}

			<div className='not-found d-flex justify-content-center m-4'>
				<img src={notFoundImg} alt='' />
			</div>
		</>
	)
}
