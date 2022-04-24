import loadingImg from '../../assets/loading.gif'
import './Loading.css'

export default function Loading() {
	return (
		<>
			<div className='d-flex justify-content-center m-4'>
				<img src={loadingImg} alt='' />
			</div>

			<h1 className='text-center text-light'>Loading...</h1>
		</>
	)
}
