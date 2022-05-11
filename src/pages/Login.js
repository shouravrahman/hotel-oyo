import React, { useState } from 'react'
import axios from 'axios'
import Error from '../components/Error'
import Loader from '../components/Loader'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const login = async () => {
		const user = {
			email,
			password,
		}

		try {
			setLoading(true)
			const result = (await axios.post('/api/users/login', user)).data
			setLoading(false)

			localStorage.setItem('currentUser', JSON.stringify(result))

			window.location.href = '/home'
		} catch (error) {
			setLoading(false)
			setError(true)
		}
	}

	return (
		<div>
			{loading && <Loader />}
			<div
				className='row justify-content-center mt-5'
				data-aos='zoom-in'
				data-aos-duration='1500'>
				<div className='col-md-5 mt-5'>
					{error && <Error message='Invalid credentials' />}
					<div className='bs'>
						<h1>Login</h1>

						<input
							type='email'
							className='form-control'
							placeholder='email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>

						<input
							type='password'
							className='form-control'
							placeholder='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>

						<button className='btn btn-primary mt-3' onClick={login}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
