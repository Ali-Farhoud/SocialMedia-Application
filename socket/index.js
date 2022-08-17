const io = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3000',
	},
})
let users = []
io.on('connection', (socket) => {
	console.log(`user ${socket.id} connected`)
	socket.on('addUser', (userId) => {
		!users.some((user) => user.userId === userId) &&
			users.push({ userId, socketId: socket.id })
		io.emit('users', users)
	})

	socket.on('sendMessage', ({ senderId, recieverId, text }) => {
		const user = users.find((user) => user.userId === recieverId)

		if (user) {
			io.to(user.socketId).emit('getMessage', {
				senderId,
				text,
			})
		}
	})
	socket.on('disconnect', () => {
		console.log(`use ${socket.id} disconnected`)
		users = users.filter((user) => user.socketId !== socket.id)
	})
})
