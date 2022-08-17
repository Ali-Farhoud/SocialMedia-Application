const router = require('express').Router()
const Message = require('../models/Message')

// create a conversation
router.post('/', async (req, res) => {
	const newMessage = new Message(req.body)
	try {
		const savedMessage = await newMessage.save()
		res.status(200).json(savedMessage)
	} catch (error) {
		res.json(error)
	}
})

// get all messages in a conversation

router.get('/:id', async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.id,
		})
		if (messages) {
			res.status(200).json(messages)
		} else {
			res.status(404).json('no messages found')
		}
	} catch (error) {
		res.json(error)
	}
})
module.exports = router
