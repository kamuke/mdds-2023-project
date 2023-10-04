'use strict';

const url = 'http://localhost:3010';
const form = document.getElementById('loginForm');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  console.log('comment', data);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url + '/api/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    localStorage.setItem('userInfo', JSON.stringify(json));
    window.location.href = 'index.html';
  } catch (e) {
    console.log(e.message);
  }
});