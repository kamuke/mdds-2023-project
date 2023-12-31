"use strict";

const socket = io('http://localhost:3000');

const messages = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const joinForm = document.getElementById('joinForm');
const messageInput = document.getElementById('messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const roomSelect = document.getElementById('roomSelect');
const usersButton = document.getElementById('getUserListBtn');
const usersList = document.getElementById('userList');

let selectedRoom = roomSelect.value;

// check for user info in local storage and joins the chat with username if found and hides join form
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo) {
  socket.emit('join', userInfo.name);
  document.getElementById('login').classList.add('hidden');
  document.getElementById('messageForm').classList.remove('hidden');
  document.getElementById('messageForm').classList.add('flex');
  usersButton.classList.remove('invisible');
}

// manually joins chat with inputted nickname and hides join form
joinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (nicknameInput.value) {
    socket.emit('join', nicknameInput.value);
    nicknameInput.value = '';
    document.getElementById('login').classList.add('hidden');
    document.getElementById('messageForm').classList.remove('hidden');
    document.getElementById('messageForm').classList.add('flex');
    usersButton.classList.remove('invisible');
    document.getElementById('messageInput').focus();
  }
});

// sends message to server and clears input field
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (messageInput.value) {
    const message = messageInput.value;
    socket.emit('chat message', {
      room: selectedRoom,
      message: message,
    });
    messageInput.value = '';
  }
});

// selects room from dropdown menu
roomSelect.addEventListener('change', () => {
  messages.innerHTML = '';
  selectedRoom = roomSelect.value;
  socket.emit('join room', selectedRoom);
});

// toggles user list and message view
usersButton.addEventListener('click', () => {
  usersList.classList.toggle('hidden');
  messages.classList.toggle('hidden');
  roomSelect.classList.toggle('invisible');
  messageForm.classList.toggle('hidden');

  usersButton.classList.toggle('bg-primary');
  usersButton.classList.toggle('text-gray-900');
});

// joins chat on page load
socket.on('connect', () => {
  socket.emit('join room', selectedRoom);
});

// updates user list with name and socket.id
socket.on('user list', (users) => {
  usersButton.innerText = `Users (${users.length})`;
  usersList.innerText = '';

  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = `${user.username}`;

    li.classList.add(
      'font-semibold',
      'p-2',
      'text-sm',
      'rounded-lg',
      'mb-2',
      'w-full',
      'shadow'
    );

    if (socket.id === user.id) {
      li.classList.add('bg-tetriary-100', 'self-end');
      li.classList.add('text-tetriary-900');
    } else {
      li.classList.add('bg-secondary-100');
      li.classList.add('text-secondary-900');
    }
    usersList.appendChild(li);
  });
});

// loads chat history on joining a room
socket.on('chat history', (chatHistory) => {
  messages.innerHTML = '';
  for (const message of chatHistory) {
    displayMessage(message);
  }
});

// displays message on receiving a message
socket.on('chat message', (msg) => {
  if (roomSelect.value !== msg.room) return;
  displayMessage(msg);
});

// adds a message to the chat window
function displayMessage(msg) {
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
  usernameItem.textContent = msg.user;

  if (socket.id === msg.userId) {
    listItem.classList.add('bg-tetriary-100', 'self-end');
    usernameItem.classList.add('text-tetriary-900');
  } else {
    listItem.classList.add('bg-secondary-100');
    usernameItem.classList.add('text-secondary-900');
  }

  const messageTime = document.createElement('p');
  messageTime.classList.add('text-xs', 'text-gray-500', 'ml-2');
  messageTime.textContent = msg.time;

  const messageItem = document.createElement('p');
  messageItem.classList.add('text-gray-900');
  messageItem.textContent = msg.message;

  const header = document.createElement('div');
  header.classList.add('flex', 'justify-between');
  header.appendChild(usernameItem);
  header.appendChild(messageTime);

  listItem.appendChild(header);
  listItem.appendChild(messageItem);
  messages.appendChild(listItem);
  messages.scrollTo(0, document.body.scrollHeight);
}
