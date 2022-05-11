import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

const Rooms = () => {
	const [rooms, setrooms] = useState([])
	const [loading, setloading] = useState()
	const [error, seterror] = useState([])
	const getadminrooms = async () => {
		try {
			setloading(true)
			const result = await (await axios.get('/api/bookings/getallrooms')).data
			setrooms(result)
			setloading(false)
		} catch (error) {
			console.log(error)
			setloading(false)
			seterror(true)
		}
	}
	useEffect(() => {
		getadminrooms()
	}, [])

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Rooms</h1>
				{loading && <Loader />}

				<table className='table table-bordered table-dark'>
					<thead className='bs'>
						<tr>
							<th>Room Id</th>
							<th>Name</th>
							<th>Type</th>
							<th>Rent Per Day</th>
							<th>Max Count</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<tbody>
						{rooms.length &&
							rooms.map((room) => {
								return (
									<tr>
										<td>{room._id}</td>
										<td>{room.name}</td>
										<td>{room.type}</td>
										<td>{room.rentperday}</td>
										<td>{room.maxcount}</td>
										<td>{room.phonenumber}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Rooms
