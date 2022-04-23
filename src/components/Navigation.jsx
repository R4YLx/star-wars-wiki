import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
	const [isActive, setActive] = useState(false)
	const handleToggle = () => {
		setActive(!isActive)
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
			<div className='container-fluid'>
				<NavLink to='/' className='navbar-brand'>
					Star Wars Wiki
				</NavLink>
				<button
					onClick={handleToggle}
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor01'
					aria-controls='navbarColor01'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div
					className={`${isActive ? 'collapse' : ''} navbar-collapse`}
					id='navbarColor01'
				>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item'>
							<NavLink to='/characters' className='nav-link'>
								Characters
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink to='/films' className='nav-link'>
								Films
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
