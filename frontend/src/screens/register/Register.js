import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../actions/userActions'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const dispatch = useDispatch()
	const userSignup = useSelector((state) => state.userSignup)
	const { success } = userSignup
	const navigate = useNavigate()

	useEffect(() => {
		if (success) {
			alert('User registered successfuly ')
			navigate('/signin')
		}
	}, [success, navigate])
	const signupHandler = (user) => {
		if (user.username.length < 3) {
			alert('You name should be more than 3 charachters')
		} else if (user.email.length < 5) {
			alert('invalid email')
		} else if (user.password !== user.confirmPassword) {
			alert("Passwords don't match")
		} else if (user.password.length < 4) {
			alert('password is too short')
		} else {
			const { confirmPassword, ...other } = user
			dispatch(signup(other))
		}
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
								type='text'
								placeholder='Enter Your Full Name'
								className='loginInput'
								onChange={(e) => setUsername(e.target.value)}
							/>
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
							<input
								type='password'
								placeholder='Confirm Password'
								className='loginInput'
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								onClick={() =>
									signupHandler({
										username,
										email,
										password,
										confirmPassword,
									})
								}
								className='loginButton'
							>
								Sign Up
							</button>
							<span className='loginForget'>Already Have an account?</span>
							<Link to='/signin'>
								<button className='loginRegister'>Log In</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
