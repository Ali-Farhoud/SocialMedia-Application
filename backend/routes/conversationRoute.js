const router = require('express').Router()
const Conversation = require('../models/Conversation')

// create a conversation
router.post('/', async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.recieverId],
	})
	try {
		const savedConversation = await newConversation.save()
		res.status(200).json(savedConversation)
	} catch (error) {
		res.json(error)
	}
})

// get conversations of user

router.get('/:id', async (req, res) => {
	try {
		const conversations = await Conversation.find({
			members: req.params.id,
		})
		if (conversations) {
			res.status(200).json(conversations)
		} else {
			res.status(404).json('no conversations found')
		}
	} catch (error) {
		res.json(error)
	}
})
module.exports = router
