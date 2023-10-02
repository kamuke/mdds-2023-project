'use strict';

require ('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
app.use(cors());
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

const rooms = {
  room1: [],
  room2: [],
  room3: []
};

const users = [];

const deleteUserById = (socketId) => {
  try {
    const index = users.findIndex(user => user.id === socketId);
    console.log('deleting user', users[index]);
    users.splice(index, 1);
  } catch (error) {
    console.warn('deleting user failed', error);
  }
};

io.on('connection', (socket) => {
  console.log('user is connected', socket.id);
  io.emit('user list', users);

  socket.on('join', (username) => {
    users.push({username: username, id: socket.id});
    console.log('users connected:', users);
    io.emit('user list', users);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
    deleteUserById(socket.id);
    io.emit('user list', users);
  });

  socket.on('join room', (room) => {
    console.log(`${socket.id} joining room`, room);
    socket.join(room);
    socket.emit('chat history', rooms[`room${room}`]);
  });

  socket.on('chat message', (msg) => {
    console.log('message by: ' + socket.id, msg);

    const room = `room${msg.room}`;
    const user = users.find(user => user.id === socket.id);

    const UTCTime = new Date();
    const LocalTime = new Date(UTCTime.getTime() + 3 * 60 * 60 * 1000);
    const options = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = LocalTime.toLocaleTimeString('fi-FI', options);

    if (rooms[room].length >= 5) {
      rooms[room].shift();
    }
    const message = {userId:socket.id, user:user.username, message:msg.message, time:formattedTime}
    rooms[room].push(message);
    console.log('testii', rooms);
  
    io.emit('chat message', message);
  });
});


http.listen(port, () => {
  console.log(`listening on port:${port}`);
});
