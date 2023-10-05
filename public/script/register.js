'use strict';

const url = 'http://localhost:3010';
const form = document.getElementById('registerForm');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  
  try {
  const response = await fetch(url + '/api/register', fetchOptions);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
      alert(message);
    throw new Error(message || response.statusText);
  }
  console.log('register response', json);
  window.location.href = 'login.html';
  } catch (e) {
    console.log(e.message);
  }
});