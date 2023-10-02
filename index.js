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
let currentRoom;

const users = [];

const deleteUserById = (socketId) => {
  try {
    const index = users.findIndex(user => user.id === socketId);

    if (index !== -1) {
      console.log('Deleting user:', users[index]);
      users.splice(index, 1);
    } else {
      console.log('User not found with ID:', socketId);
    }
  } catch (error) {
    console.warn('Deleting user failed:', error);
  }
};

io.on('connection', (socket) => {
  console.log('user is connected', socket.id);
  io.emit('user list', users);

  socket.on('join', (username) => {
    users.push({username: username, id: socket.id});
    io.emit('user list', users);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
    deleteUserById(socket.id);
    io.emit('user list', users);
  });

  socket.on('join room', (room) => {
    socket.join(room);
    currentRoom = room;
    console.log(`${socket.id} joining room`, room);
    io.to(currentRoom).emit('chat history', rooms[`room${room}`]);
  });

  socket.on('chat message', (msg) => {
    console.log('message by: ' + socket.id, msg);

    const room = `room${msg.room}`;
    const user = users.find(user => user.id === socket.id);

    const UTCTime = new Date();
    const LocalTime = new Date(UTCTime.getTime() + 3 * 60 * 60 * 1000);
    const options = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = LocalTime.toLocaleTimeString('fi-FI', options);

    if (rooms[room].length >= 50) {
      rooms[room].shift();
    }
    const message = {userId:socket.id, user:user.username, message:msg.message, time:formattedTime}
    rooms[room].push(message);

    io.to(currentRoom).emit('chat message', message);
  });
});


http.listen(port, () => {
  console.log(`listening on port:${port}`);
});
