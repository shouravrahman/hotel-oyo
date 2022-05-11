import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import { Tag, Divider } from 'antd'

const MyBookings = ({ user }) => {
	const [loading, setLoading] = useState(false)
	// const [error, setError] = useState(false)
	const [bookings, setbookings] = useState([])

	useEffect(() => {
		getBookedRooms(user)
	}, [])

	const getBookedRooms = async (user) => {
		console.log(user)
		try {
			setLoading(true)
			const data = await (
				await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
			).data

			console.log(data)
			setbookings(data)
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const cancelBooking = async (bookingid, roomid) => {
		try {
			setLoading(true)
			const result = await (
				await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })
			).data
			console.log(result)
			setLoading(false)
			Swal.fire(
				'Congratulations',
				'Your booking has been cancelled',
				'success'
			).then((result) => window.location.reload())
		} catch (error) {
			console.log(error)
			setLoading(false)
			Swal.fire('Oops', 'something went wrong', 'error')
		}
	}

	return (
		<div>
			<div className='row'>
				<div className='col-md-6'>
					{loading && <Loader />}
					{bookings &&
						bookings.map((booking) => {
							return (
								<div className='bs m-3 p-2' key={booking._id}>
									<h1>{booking.room}</h1>
									<p>
										<b>BookingId</b> : {booking._id}
									</p>
									<p>
										<b>Check In</b> : {booking.fromdate}
									</p>
									<p>
										<b>Check Out</b> : {booking.todate}
									</p>
									<p>
										<b>Amount</b> : {booking.totalamount}
									</p>
									<p>
										<b>Status </b> :{' '}
										{booking.status == 'cancelled' ? (
											<Tag color='red'>CANCELLED</Tag>
										) : (
											<Tag color='green'>CONFIRMED</Tag>
										)}
									</p>

									{booking.status !== 'cancelled' && (
										<div className='text-right'>
											<button
												onClick={() => {
													cancelBooking(booking._id, booking.roomid)
												}}
												className='btn btn-primary'>
												Cancel Booking
											</button>
										</div>
									)}
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default MyBookings
