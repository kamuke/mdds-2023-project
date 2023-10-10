"use strict";

require ('dotenv').config();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./database/routes/routes');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routes);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

// MongoDB section
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

// Socket.io section
const rooms = {
  1: [],
  2: [],
  3: []
};
const users = [];

// searches users array for user with matching socketId and deletes it
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
  // sends user list to all users on conncect
  io.emit('user list', users);

  // adds user to users array and refreshes user list
  socket.on('join', (username) => {
    users.push({username: username, id: socket.id});
    io.emit('user list', users);
  });

  // deletes user from users array on disconnect and refreshes user list
  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
    deleteUserById(socket.id);
    io.emit('user list', users);
  });

  // joins a room and sends room chat history to the user
  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`${socket.id} joining room`, room);
    socket.emit('chat history', rooms[room]);
  });

  socket.on('chat message', (msg) => {
    console.log('message by: ' + socket.id, msg);
    // searches username from users array with matching socket.id
    const user = users.find(user => user.id === socket.id);

    // gets time and formats it from utc to gmt+3
    const UTCTime = new Date();
    const LocalTime = new Date(UTCTime.getTime() + 3 * 60 * 60 * 1000);
    const options = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = LocalTime.toLocaleTimeString('fi-FI', options);

    // save only 100 messages per room
    if (rooms[msg.room].length >= 100) {
      rooms[msg.room].shift();
    }

    // constructs message object and pushes it to rooms array
    const message = {userId:socket.id, room:msg.room, user:user.username, message:msg.message, time:formattedTime}
    rooms[msg.room].push(message);

    // sends message to all users in the same room
    io.to(msg.room).emit('chat message', message);
  });
});


http.listen(port, () => {
  console.log(`listening on port:${port}`);
});
