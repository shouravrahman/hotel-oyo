/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import 'antd/dist/antd.css'
import { DatePicker } from 'antd'
import moment from 'moment'
import AOS from 'aos'
import 'aos/dist/aos.css'
import data from '../data'
AOS.init({
	duration: 1100,
})

const Home = () => {
	const [rooms, setRooms] = useState([])
	const [duplicaterooms, setDuplicateRooms] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [fromdate, setFromdate] = useState()
	const [todate, setTodate] = useState()
	const [searchKey, setSearchKey] = useState('')
	const [type, setType] = useState('all')

	const { RangePicker } = DatePicker
	const getallrooms = async () => {
		try {
			setLoading(true)
			// const data = await axios.get('/api/rooms/getallrooms')
			const data = (await axios.get('/api/rooms/getallrooms')).data
			console.log(data)
			setRooms(data)
			setDuplicateRooms(data)
			setLoading(false)
		} catch (error) {
			setError(true)
			console.log(error)
			setLoading(false)
		}
	}
	useEffect(() => {
		getallrooms()
	}, [])

	const filterByDate = (dates) => {
		// console.log(dates)
		setFromdate(moment(dates[0]).format('DD-MM-YYYY'))
		setTodate(moment(dates[1]).format('DD-MM-YYYY'))

		let temprooms = []
		let availability = false

		for (let room of duplicaterooms) {
			if (room.currentbookings.length > 0) {
				for (let booking of room.currentbookings) {
					if (
						!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
							booking.fromdate,
							booking.todate
						) &&
						!moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
							booking.fromdate,
							booking.todate
						)
					) {
						if (
							moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
							moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
							moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
							moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
						) {
							availability = true
						}
					}
				}
			}
			if (availability === true || room.currentbookings.length === 0) {
				temprooms.push(room)
			}
			setRooms(temprooms)
		}
	}
	const filterBySearch = () => {
		const temprooms = duplicaterooms.filter((room) =>
			room.name.toLowerCase().includes(searchKey.toLowerCase())
		)
		setRooms(temprooms)
	}
	const filterByType = (e) => {
		setType(e)
		if (e !== 'all') {
			const temprooms = duplicaterooms.filter(
				(room) => room.type.toLowerCase() == e.toLowerCase()
			)
			setRooms(temprooms)
		} else {
			setRooms(duplicaterooms)
		}
	}
	return (
		<div className='container text-right'>
			<div className='row mt-5 bs' data-aos='fade-right'>
				<div className='col-md-4'>
					<RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
				</div>
				<div className='col-md-5'>
					<input
						type='text'
						className='form-control'
						placeholder='search rooms'
						value={searchKey}
						onChange={(e) => {
							setSearchKey(e.target.value)
						}}
						onKeyUp={filterBySearch}
					/>
				</div>
				<div className='col-md-2'>
					<select
						className='form-control'
						value={type}
						onChange={(e) => {
							filterByType(e.target.value)
						}}>
						<option value='all'>All</option>
						<option value='delux'>Delux</option>
						<option value='non-delux'>Non-Delux</option>
					</select>
				</div>
			</div>

			<div className='row justify-content-center mt-5 '>
				{loading ? (
					<Loader />
				) : (
					data.map((room) => {
						return (
							<div className='col-md-9 my-3'>
								<Room room={room} fromdate={fromdate} todate={todate} />
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default Home
