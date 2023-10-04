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
  
  const response = await fetch(url + '/api/register', fetchOptions);
  const json = await response.json();
  console.log('register response', json);
  if (json.message) {
    alert("Give an unique email address");
  }
});