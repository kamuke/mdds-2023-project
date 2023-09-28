'use strict';

const socket = io();

const messages = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const roomSelect = document.getElementById('roomSelect');

let selectedRoom = roomSelect.value;
socket.emit('join room', selectedRoom);

roomSelect.addEventListener('change', () => {
  messages.innerHTML = '';
  selectedRoom = roomSelect.value;
  socket.emit('join room', selectedRoom);
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (messageInput.value) {
    const nickname = nicknameInput.value;
    const message = messageInput.value;
    socket.emit('chat message', {
      room: selectedRoom,
      nickname: nickname,
      message: message,
    });
    messageInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const currentNickname = nicknameInput.value;

  const listItem = document.createElement('li');
  listItem.classList.add(
    'p-2',
    'text-sm',
    'rounded-lg',
    'mb-4',
    'w-full',
    'shadow'
  );

  const usernameItem = document.createElement('p');
  usernameItem.classList.add('font-semibold');
  usernameItem.textContent = msg.nickname;

  if (currentNickname === msg.nickname) {
    listItem.classList.add('bg-tetriary-100', 'self-end');
    usernameItem.classList.add('text-tetriary-900');
  } else {
    listItem.classList.add('bg-secondary-100');
    usernameItem.classList.add('text-secondary-900');
  }

  const messageItem = document.createElement('p');
  messageItem.classList.add('text-gray-900');
  messageItem.textContent = msg.message;

  listItem.appendChild(usernameItem);
  listItem.appendChild(messageItem);
  messages.appendChild(listItem);
  messages.scrollTo(0, document.body.scrollHeight);
});
