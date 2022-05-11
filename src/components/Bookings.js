import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'

const Bookings = () => {
	const [bookings, setbookings] = useState([])
	const [loading, setloading] = useState()
	const [error, seterror] = useState([])
	const getadminbookings = async () => {
		try {
			setloading(true)
			const result = await (await axios.get('/api/bookings/getallbookings')).data
			setbookings(result)
			setloading(false)
		} catch (error) {
			console.log(error)
			setloading(false)
			seterror(true)
		}
	}
	useEffect(() => {
		getadminbookings()
	}, [])

	return (
		<div className='row'>
			<div className='col-md-12'>
				<h1>Bookings</h1>
				{loading && <Loader />}

				<table className='table table-bordered table-dark'>
					<thead className='bs'>
						<tr>
							<th>Booking Id</th>
							<th>User Id</th>
							<th>Room</th>
							<th>From</th>
							<th>To</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{bookings.length &&
							bookings.map((booking) => {
								return (
									<tr>
										<td>{booking._id}</td>
										<td>{booking.userid}</td>
										<td>{booking.room}</td>
										<td>{booking.fromdate}</td>
										<td>{booking.todate}</td>
										<td>{booking.status}</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Bookings
