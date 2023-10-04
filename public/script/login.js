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
    localStorage.setItem('userId', json._id);
    localStorage.setItem('userInfo', JSON.stringify(json));
  } catch (e) {
    console.log(e.message);
  }
});

const authUser = async () => {
    const id = localStorage.getItem('userId');
    const userInfo = localStorage.getItem('userInfo');
    console.log('id', id);
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      };
        const response = await fetch(url + '/api/authUser', fetchOptions);
        const user = await response.json();
        console.log('authUser fetch', user);
        if (user._id !== id || user.email !== userInfo.email ) {
        window.location.href = 'register.html';
        localStorage.removeItem('user');
      }
    } catch (e) {
      console.log(e.message);
    }
}
//authUser();