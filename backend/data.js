const bcrypt = require('bcrypt')
const Users = [
	{
		email: 'person1@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/1.jpeg',
		username: 'Safak Kocaoglu',
	},
	{
		email: 'person2@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/2.jpeg',
		username: 'Janell Shrum',
	},
	{
		email: 'person3@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/3.jpeg',
		username: 'Alex Durden',
	},
	{
		email: 'person4@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/4.jpeg',
		username: 'Dora Hawks',
	},
	{
		email: 'person5@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/5.jpeg',
		username: 'Thomas Holden',
	},
	{
		email: 'person6@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/6.jpeg',
		username: 'Shirley Beauchamp',
	},
	{
		email: 'person7@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/7.jpeg',
		username: 'Travis Bennett',
	},
	{
		email: 'person8@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/8.jpeg',
		username: 'Kristen Thomas',
	},
	{
		email: 'person9@example.com',
		password: bcrypt.hashSync('123456', 10),
		profilePicture: '/assets/person/9.jpeg',
		username: 'Gary Duty',
	},
]

const Posts = [
	{
		description: 'Love For All, Hatred For None.',
		image: '/assets/post/1.jpeg',

		likes: [],
	},
	{
		description: 'MESSI GOAT',
		image: '/assets/post/4.jpeg',

		likes: [],
	},
	{
		description: 'TO LOVE IS TO THINK',
		image: '/assets/post/2.jpeg',

		likes: [],
	},
	{
		description: 'CANT WAIT FOR THE WORLD CUP',
		image: '/assets/post/3.jpeg',

		likes: [],
	},
]
module.exports = {
	Posts,
	Users,
}
