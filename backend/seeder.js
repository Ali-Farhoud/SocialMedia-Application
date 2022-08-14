const User = require('./models/User')
const Post = require('./models/Post')
const { Users, Posts } = require('./data')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
	console.log('Connected to MongoDB')
})

const importData = async () => {
	try {
		await User.deleteMany()
		await Post.deleteMany()
		const createdUsers = await User.insertMany(Users)
		console.log(createdUsers[0]._id)
		const createdPosts = Posts.map((post) => {
			return {
				...post,
				userId:
					createdUsers[Math.floor(Math.random() * createdUsers.length + 1)]._id,
			}
		})
		await Post.insertMany(createdPosts)
		console.log('Data Imported')
		process.exit()
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}
importData()
