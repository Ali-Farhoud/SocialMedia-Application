import './login.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	})
	const loginHandler = () => {
		dispatch(login(email, password))
	}
	return (
		<div className='main-login'>
			<div className='login'>
				<div className='loginWrapper'>
					<div className='loginLeft'>
						<h1 className='loginTitle'>Social App</h1>
						<span className='loginDescription'>
							Connect with friends and family on the social app
						</span>
					</div>
					<div className='loginRight'>
						<div className='loginBox'>
							<input
								type='email'
								placeholder='Enter Your email'
								className='loginInput'
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='password'
								placeholder='Enter Your Password'
								className='loginInput'
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button onClick={loginHandler} className='loginButton'>
								Log In
							</button>
							<span className='loginForget'>Forgot Password?</span>
							<Link to='/signup'>
								<button className='loginRegister'>Create A New Account</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
