import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
	duration: 600,
})

const Landing = () => {
	return (
		<div>
			<div>
				<div
					id='carouselExampleFade'
					className='carousel slide carousel-fade'
					data-ride='carousel'>
					<div className='carousel-inner'>
						<div className='carousel-item active'>
							<img
								style={{
									objectFit: 'cover',
									maxWidth: '100%',
									maxHeight: '100vh',
									margin: 'auto',
								}}
								src='https://images.unsplash.com/photo-1524524692660-9838adb9c179?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBob3RlbCUyMHJvb21zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100'
								className='d-block w-100 img-fluid'
								alt='...'
							/>
						</div>
						<div className='carousel-item'>
							<img
								src='https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvb21zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100'
								className='d-block w-100 img-fluid'
								style={{
									objectFit: 'cover',
									maxWidth: '100%',
									maxHeight: '100vh',
									margin: 'auto',
								}}
								alt='...'
							/>
						</div>
						<div className='carousel-item'>
							<img
								src='https://images.unsplash.com/photo-1552858725-a019f14f0cec?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRhcmslMjBob3RlbCUyMHJvb21zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100'
								className='d-block w-100 img-fluid'
								style={{
									objectFit: 'cover',
									maxWidth: '100%',
									maxHeight: '100vh',
									margin: 'auto',
								}}
								alt='...'
							/>
						</div>
					</div>
					<a
						className='carousel-control-prev'
						href='#carouselExampleFade'
						role='button'
						data-slide='prev'>
						<span className='carousel-control-prev-icon' aria-hidden='true'></span>
						<span className='sr-only'>Previous</span>
					</a>
					<a
						className='carousel-control-next'
						href='#carouselExampleFade'
						role='button'
						data-slide='next'>
						<span className='carousel-control-next-icon' aria-hidden='true'></span>
						<span className='sr-only'>Next</span>
					</a>
				</div>
			</div>
			<div className='align-middle center-div'>
				<h2 className='carousel-overlay-h2'>
					<span className='text-primary carousel-overlay-span'>MERN</span>rooms
				</h2>
				<h1 className='carousel-overlay-h1'>There is only one Boss. The Guest</h1>
				<Link to='/home'>
					<button data-aos='zoom-in' className='carousel-overlay-btn'>
						Explore
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Landing
