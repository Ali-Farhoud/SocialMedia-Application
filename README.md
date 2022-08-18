# SocialMedia-Application

In this project, I created a full stack social media application that is a facebook clone.
The application is fully functional as the user is able to :
 
- Create an account and sign in with valid creditionals to enter website
- Browse for users with an account on this platform
- Follow and unfollow users
- View homepage timeline that displays followed users' posts
- Post text and images for followers to see
- Like and dislike users' posts
- Real time messaging and chat with friends

# Technology Used

For the server-side in the backend folder the following technologies and frameworks were used:

- Node JS and Express JS to build a backend REST API with routing
- MongoDB NoSQL database and mongoose to store users, posts and messages as documents and perform queries on them
- used multer middleware to be able to upload files to backend
- morgan to track requests and responses

In the socket folder, I implemented a socket IO server and used a websocket that connects to front end
allowing users to communicate in real time .

For the client side in the frontend folder the following technologies and frameworks were used:

- React JS framework/library for javascript for building user interface
- React Router to implement a single page application
- Material UI for styled components and icons
- Axios for fetching data from backend API 
- Socket io client to connect to socket server
- Redux for state managment in a big application
- React hooks 
