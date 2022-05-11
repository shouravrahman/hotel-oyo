import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, Carousel } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
	duration: 1100,
})

const Room = ({ room, fromdate, todate }) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	return (
		<div className='row bs my-3  align-items-center ' data-aos='fade-right'>
			<div className='col-md-5 me-5'>
				<img src={room.imageurls[0]} alt={room.name} className='smallimg ' />
			</div>
			<div className='col-md-7'>
				<h1 className='mb-3'>{room.name}</h1>

				<p>
					<b>Max Count :</b> {room.maxcount}
				</p>
				<p>
					<b>Price (usd) :</b> {room.rentperday}
				</p>
				<p>
					<b>Phone Number :</b> {room.phonenumber}
				</p>
				<p>
					<b>Type :</b> {room.type}
				</p>

				<div style={{ float: 'right' }}>
					{/* //todo: pass a link */}

					{fromdate && todate && (
						<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
							<button className='btn m-2'>Book Now</button>
						</Link>
					)}

					<button onClick={handleShow} className='btn'>
						View Details
					</button>
				</div>
			</div>

			<Modal show={show} onHide={handleClose} size='lg'>
				<Modal.Header>
					<Modal.Title>{room.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Carousel variant='dark' prevLabel='' nextLabel='' fade>
						{room.imageurls.map((url) => {
							return (
								<Carousel.Item>
									<img
										key={Math.random()}
										className='bigimg d-block w-100'
										src={url}
										alt={room.name}
									/>

									{/* <Carousel.Caption style={{ color: 'black' }}>
										{room.description}
									</Carousel.Caption> */}
								</Carousel.Item>
							)
						})}
					</Carousel>
					<p className='modal-desc'>{room.description}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Room
