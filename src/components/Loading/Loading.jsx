import loadingImg from '../../assets/loading.gif'
import './Loading.css'

export default function Loading() {
	return (
		<div className='mt-4'>
			<img src={loadingImg} alt='' />
			<h1 className='text-center text-light'>Loading...</h1>
		</div>
	)
}
