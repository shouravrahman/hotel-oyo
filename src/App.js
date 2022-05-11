import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Booking from './pages/Booking'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Landing from './pages/Landing'
function App() {
	return (
		<div className='App'>
			<Navbar />

			<Router>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/home' component={Home} />
					<Route exact path='/book/:roomid/:fromdate/:todate' component={Booking} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/admin' component={Admin} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
