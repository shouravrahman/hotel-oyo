import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
const Users = () => {
	const [users, setusers] = useState([])
	const [loading, setloading] = useState()
	const [error, seterror] = useState()

	const getadminusers = async () => {
		try {
			setloading(true)
			const result = await (await axios.get('/api/users/getallusers')).data
			setusers(result)
			setloading(false)
		} catch (error) {
			console.log(error)
			setloading(false)
			seterror(true)
		}
	}
	useEffect(() => {
		getadminusers()
	}, [])
	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Users</h1>

				<table className='table table-bordered table-dark'>
					<thead>
						<tr>
							<th>User Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
						</tr>
					</thead>
					<tbody>
						{loading && <Loader />}
						{users &&
							users.map((user) => {
								return (
									<tr>
										<td>{user._id}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.isAdmin ? 'Yes' : 'No'}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Users
