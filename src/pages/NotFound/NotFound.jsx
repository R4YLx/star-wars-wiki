import notFoundImg from '../../assets/404.gif'
import './NotFound.css'

export default function NotFound() {
	return (
		<>
			<h1 className='text-center text-white'>404: Page not found</h1>

			<div className='not-found d-flex justify-content-center m-4'>
				<img src={notFoundImg} alt='' />
			</div>
		</>
	)
}
