'use strict';

const url = 'http://localhost:3010';
const form = document.getElementById('loginForm');

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
    const response = await fetch(url + '/api/login', fetchOptions);
    const json = await response.json();
    if (!response.ok) {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
    localStorage.setItem('userInfo', JSON.stringify(json));
    window.location.href = 'index.html';
  } catch (e) {
    alert(e.message);
    localStorage.removeItem('userInfo');
    console.log(e.message);
  }
});