import loadingImg from '../../assets/loading.gif'
import './Loading.css'

export default function Loading() {
	return (
		// Setting loading page
		<>
			<div className='d-flex justify-content-center m-4 animate__animated animate__fadeInDown'>
				<img src={loadingImg} alt='' />
			</div>

			<h1 className='text-center text-light animate__animated animate__fadeInDown'>
				Loading...
			</h1>
		</>
	)
}
