import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Success from '../components/Success'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	const register = async () => {
		if (password === confirmPassword) {
			const user = {
				name,
				email,
				password,
				confirmPassword,
			}

			try {
				setLoading(true)
				const result = (await axios.post('/api/users/register', user)).data
				setLoading(false)
				setSuccess(true)

				setName('')
				setEmail('')
				setPassword('')
				setConfirmPassword('')
				window.location.href = '/login'
			} catch (error) {
				console.log(error)
				setLoading(false)
				setError(true)
			}
		} else {
			alert('password not matched')
		}
	}

	return (
		<div>
			{loading && <Loader />}
			{error && (
				<Error message='Somethings Wrong...please try again with valid credentials..' />
			)}

			<div className='row justify-content-center mt-5'>
				<div className='col-md-5 mt-5'>
					{success && <Success message='Registration completed' />}

					<div className='bs' data-aos='zoom-in' data-aos-duration='1500'>
						<h1>Register</h1>
						<input
							type='text'
							className='form-control'
							placeholder='name'
							value={name}
							onChange={(e) => {
								setName(e.target.value)
							}}
						/>

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

						<input
							type='password'
							className='form-control'
							placeholder='confirm password'
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value)
							}}
						/>

						<button className='btn btn-primary mt-3' onClick={register}>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
