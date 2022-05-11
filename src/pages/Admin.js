import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import AddRoom from '../components/AddRoom'
import Bookings from '../components/Bookings.js'
import Rooms from '../components/Rooms'
import Users from '../components/Users'
const { TabPane } = Tabs
const Admin = () => {
	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
			window.location.href = '/home'
		}
	}, [])
	return (
		<div className='bs m-3'>
			<h2 className='text-center' style={{ fontSize: '30px' }}>
				<b>Admin Panel</b>
			</h2>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='Bookings' key='1'>
					<Bookings />
				</TabPane>
				<TabPane tab='Rooms' key='2'>
					<Rooms />
				</TabPane>
				<TabPane tab='Add Rooms' key='3'>
					<AddRoom />
				</TabPane>
				<TabPane tab='Users' key='4'>
					<Users />
				</TabPane>
			</Tabs>
		</div>
	)
}

export default Admin
