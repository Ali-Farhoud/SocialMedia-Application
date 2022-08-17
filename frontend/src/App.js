import Header from './components/Header/Header'
import Homepage from './screens/homepage/HomePage'
import Profile from './screens/profile/Profile'
import Login from './screens/login/Login'
import Register from './screens/register/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Messenger from './screens/messenger/Messenger'
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/profile/:id'
					element={
						<>
							<Header />
							<Profile />
						</>
					}
				></Route>
				<Route path='/signin' element={<Login />}></Route>
				<Route path='/signup' element={<Register />}></Route>
				<Route
					path='/messenger'
					element={
						<>
							<Header />
							<Messenger />
						</>
					}
				></Route>
				<Route
					path='/'
					element={
						<>
							<Header />
							<Homepage />
						</>
					}
				></Route>
			</Routes>
		</Router>
	)
}

export default App
