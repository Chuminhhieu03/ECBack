const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv')
const connection = require('./connection')
const route = require('./routes')
const app = express();

connection

dotenv.config();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', "DELETE"]
});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
route(app);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

app.set('socketio', io);

