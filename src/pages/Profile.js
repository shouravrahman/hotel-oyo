import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import MyBookings from '../components/MyBookings'

const { TabPane } = Tabs
const Profile = () => {
	const user = JSON.parse(localStorage.getItem('currentUser'))

	useEffect(() => {
		if (!user) window.location.href = '/login'
	}, [])
	return (
		<div className='m-3'>
			<div className='text-left bs mh-100'>
				<Tabs defaultActiveKey='1'>
					<TabPane tab='Profile' key='1'>
						<h1>My Profile</h1>
						<br />
						<h1>Name : {user.name}</h1>
						<h1>Email : {user.email}</h1>
						<h1>Admin : {user.isAdmin ? 'Yes' : 'No'}</h1>
					</TabPane>
					<TabPane tab='Bookings' key='2'>
						<MyBookings user={user} />
					</TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default Profile
