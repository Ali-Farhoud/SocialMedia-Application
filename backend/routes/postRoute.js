const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
//create a post
router.post('/', async (req, res) => {
	const newPost = new Post(req.body)
	try {
		const savedPost = await newPost.save()
		res.status(200).json(savedPost)
	} catch (error) {
		res.status(200).json(error)
	}
})
//update a post
router.put('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body })
			res.status(200).json('post updated')
		} else {
			res.status(403).json('you can only update ur own posts')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
//delete a post
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId) {
			await post.deleteOne()
			res.status(200).json('post deleted')
		} else {
			res.status(403).json('you can only delete ur own posts')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
//like a post
router.put('/:id/like', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } })
			res.status(200).json('post has been liked')
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } })
			res.status(200).json('post has been disliked')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
// get timeline posts
router.get('/timeline/:id', async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.id)
		const userPosts = await Post.find({ userId: currentUser._id })
		const friendPosts = await Promise.all(
			currentUser.following.map((friendId) => {
				return Post.find({ userId: friendId._id })
			})
		)
		res.json(userPosts.concat(...friendPosts))
	} catch (error) {
		res.status(500).json(error)
	}
})
//get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({})
		if (posts) {
			res.status(200).json(posts)
		} else {
			res.status(404).json('no posts found')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})

//get a post
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post) {
			res.status(200).json(post)
		} else {
			res.status(404).json('post not found')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
module.exports = router
