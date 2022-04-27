import notFoundImg from '../../assets/404.gif'
import './NotFound.css'

export default function NotFound({ error }) {
	return (
		<>
			<div className='alert alert-danger text-center' role='alert'>
				{error}
			</div>

			<div className='not-found d-flex justify-content-center m-4'>
				<img src={notFoundImg} alt='' />
			</div>
		</>
	)
}
