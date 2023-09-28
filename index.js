'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user is connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('chat message', (msg) => {
    io.to(msg.room).emit('chat message', {
      message: msg.message,
      nickname: msg.nickname,
    });
    console.log(
      'chat message in room ' +
        msg.room +
        ' by user ' +
        msg.nickname +
        ': ' +
        msg.message
    );
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
