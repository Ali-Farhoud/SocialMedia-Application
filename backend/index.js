const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
const uploadRoute = require('./routes/uploadRoutes')
const path = require('path')
dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
	console.log('Connected to MongoDB')
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

//api routes
app.get('/', (req, res) => {
	res.send('Api running family...')
})
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/upload', uploadRoute)
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.listen(8800, () => {
	console.log('Backend Server is running...')
})
