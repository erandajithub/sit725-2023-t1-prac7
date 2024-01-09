const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./dbConnection');
const router = require('./routers/router');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/cat', router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected');

    // Send a welcome message to the connected user
    socket.emit('message', 'Welcome! You are connected.');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat.');

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });

    // Listen for random number requests
    socket.on('getRandomNumber', () => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        io.emit('randomNumber', randomNumber);
    });

    // Listen for disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.');
        console.log('User disconnected');
    });
});

// Periodically send a random number to all connected clients
setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    io.emit('randomNumber', randomNumber);
}, 5000);

http.listen(port, () => {
    console.log('Express server started');
});
