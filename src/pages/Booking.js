import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const Booking = ({ match }) => {
	const [room, setRoom] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const [totalamount, settotalamount] = useState()

	const roomid = match.params.roomid
	const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
	const todate = moment(match.params.todate, 'DD-MM-YYYY')

	const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1

	const getaroom = async () => {
		const user = JSON.parse(localStorage.getItem('currentUser'))

		if (!user) window.location.href = '/login'

		try {
			// setLoading(true)
			// const data = await axios.get('/api/rooms/getallrooms')
			const data = (
				await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })
			).data
			// console.log(data)
			settotalamount(data.rentperday * totaldays)
			setRoom(data)
			setLoading(false)
		} catch (error) {
			setError(true)
			// console.log(error)
			setLoading(false)
		}
	}
	useEffect(() => {
		getaroom()
	}, [])

	const onToken = async (token) => {
		console.log(token)
		const bookingDetails = {
			room,
			userid: JSON.parse(localStorage.getItem('currentUser'))._id,
			fromdate,
			todate,
			totalamount,
			totaldays,
			token,
		}

		try {
			setLoading(true)
			const result = await axios.post('/api/bookings/bookroom', bookingDetails)
			setLoading(false)
			Swal.fire('Congratulations', 'Your room booked successfully', 'success').then(
				(result) => {
					window.location.href = '/bookings'
				}
			)
		} catch (error) {
			setLoading(false)
			console.log(error)
			Swal.fire('Oops', 'Something went wrong..please try again', 'error')
		}
	}

	return (
		<div>
			{loading ? (
				<Loader />
			) : room ? (
				<div className='m-5 '>
					<div
						className='row justify-content-center m-5 bs '
						data-aos='flip-left'
						data-aos-easing='ease-out-cubic'
						data-aos-duration='1500'>
						<div className='col-md-6'>
							<h1>{room.name}</h1>
							<img src={room.imageurls[0]} className='bigimg' alt={room.name} />
						</div>

						<div className='col-md-6 text-right'>
							<div>
								<h1>Booking Details</h1>
								<hr />
								<p>
									<b>Name :</b>{' '}
									{JSON.parse(localStorage.getItem('currentUser')).name}
								</p>
								<p>
									<b>From Date : {match.params.fromdate}</b>
								</p>
								<p>
									<b>To Date : {match.params.todate}</b>
								</p>
								<p>
									<b>Max Count :</b> {room.maxcount}
								</p>
							</div>

							<div>
								<h1>Amount Details</h1>
								<hr />
								<p>
									<b>Total Days : {totaldays}</b>
								</p>
								<p>
									<b>Rent Per Day : {room.rentperday}</b>
								</p>
								<p>
									<b>Total Amount : {totalamount}</b>
								</p>
							</div>

							<div>
								<StripeCheckout
									amount={totalamount * 100}
									currency='USD'
									token={onToken}
									stripeKey='pk_test_51JbT72HOzRa38MaPzYW09tzJd1Z3i2gyvNODXU4DUhnHhVOPdDkalJjrotdvhGTVNWWLE9oKgRqN2fihMB7k2InW00CLsoTHxq'>
									<button className='btn btn-primary'>Pay Now</button>
								</StripeCheckout>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Error />
			)}
		</div>
	)
}

export default Booking
