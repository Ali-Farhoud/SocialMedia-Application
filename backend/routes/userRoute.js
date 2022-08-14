const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
//update user
router.put('/:id', async (req, res) => {
	if (req.body.userId == req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10)
				req.body.password = await bcrypt.hash(req.body.password, salt)
			} catch (err) {
				return res.status(500).json(err)
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			})
			res.status(200).json('account updated')
		} catch (err) {
			return res.status(500).json(err)
		}
	} else {
		return res.status(403).json('you can update only your account')
	}
})
// delete user
router.delete('/:id', async (req, res) => {
	if (req.body.userId == req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id)
			res.status(200).json('account deleted')
		} catch (err) {
			return res.status(500).json(err)
		}
	} else {
		return res.status(403).json('you can delete only your account')
	}
})
// get all users
router.get('/all', async (req, res) => {
	try {
		const users = await User.find({})
		if (users) {
			res.status(200).json(users)
		} else {
			res.status(404).json('no users found')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
// get a user
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (user) {
			const { password, createdAt, ...other } = user._doc
			res.status(200).json(other)
		} else {
			res.status(404).json('user not found')
		}
	} catch (error) {
		res.status(500).json(error)
	}
})

// follow a user
router.put('/:id/follow', async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: currentUser } })
				await currentUser.updateOne({ $push: { following: user } })
				res.status(200).json('user has been followed')
			} else {
				res.status(403).json('you already follow this user')
			}
		} catch (error) {
			res.status(500).json(error)
		}
	} else {
		res.status(403).json("you can't follow yourself")
	}
})
//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)

			const isThere = await User.findOne({
				followers: { $elemMatch: { _id: currentUser._id } },
			})

			if (String(isThere._id) === String(user._id)) {
				await user.updateOne({
					$pull: {
						followers: { _id: currentUser._id },
					},
				})
				await currentUser.updateOne({
					$pull: {
						following: { _id: user._id },
					},
				})
				res.status(200).json('user has been unfollowed')
			} else {
				res.status(403).json('you dont follow this user')
			}
		} catch (error) {
			res.status(500).json(error)
		}
	} else {
		res.status(403).json("you can't unfollow yourself")
	}
})
module.exports = router
