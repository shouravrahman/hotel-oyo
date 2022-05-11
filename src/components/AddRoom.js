import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loader from './Loader'
const AddRoom = () => {
	const [loading, setloading] = useState(false)
	const [error, seterror] = useState()
	const [name, setname] = useState()
	const [rentperday, setrentperday] = useState()
	const [maxcount, setmaxcount] = useState()
	const [description, setdescription] = useState()
	const [phonenumber, setphonenumber] = useState()
	const [type, settype] = useState()
	const [imageurl1, setimageurl1] = useState()
	const [imageurl2, setimageurl2] = useState()
	const [imageurl3, setimageurl3] = useState()

	const addRoom = async () => {
		const newroom = {
			name,
			rentperday,
			maxcount,
			description,
			phonenumber,
			type,
			imageurls: [imageurl1, imageurl2, imageurl3],
		}

		try {
			setloading(true)
			const result = await (await axios.post('/api/rooms/addroom', newroom)).data
			setloading(false)
			Swal.fire('congrats', 'Your new room added successfully', 'success').then(
				(result) => {
					window.location.href = '/home'
				}
			)
		} catch (error) {
			console.log(error)
			setloading(false)
			seterror(true)
			Swal.fire('Oops', 'Something went wrong', 'error')
		}
	}

	return (
		<div className='row'>
			{loading && <Loader />}
			<div className='col-md-5'>
				<input
					type='text'
					placeholder='room name'
					className='form-control'
					value={name}
					onChange={(e) => setname(e.target.value)}
				/>
				<input
					type='text'
					placeholder='rent per day'
					className='form-control'
					value={rentperday}
					onChange={(e) => setrentperday(e.target.value)}
				/>
				<input
					type='text'
					placeholder='max count'
					className='form-control'
					value={maxcount}
					onChange={(e) => setmaxcount(e.target.value)}
				/>
				<input
					type='text'
					placeholder='description'
					className='form-control'
					value={description}
					onChange={(e) => setdescription(e.target.value)}
				/>
				<input
					type='text'
					placeholder='phone number'
					className='form-control'
					value={phonenumber}
					onChange={(e) => setphonenumber(e.target.value)}
				/>
			</div>
			<div className='col-md-5'>
				<input
					type='text'
					placeholder='type'
					className='form-control'
					value={type}
					onChange={(e) => settype(e.target.value)}
				/>
				<input
					type='text'
					placeholder='image url 1'
					className='form-control'
					value={imageurl1}
					onChange={(e) => setimageurl1(e.target.value)}
				/>
				<input
					type='text'
					placeholder='image url 2'
					className='form-control'
					value={imageurl2}
					onChange={(e) => setimageurl2(e.target.value)}
				/>
				<input
					type='text'
					placeholder='image url 3'
					className='form-control'
					value={imageurl3}
					onChange={(e) => setimageurl3(e.target.value)}
				/>
				<div className='text-right'>
					<button className='btn btn-primary mt-2' onClick={addRoom}>
						Add Room
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddRoom
