"use strict";

const authUser = async () => {
  const url = 'http://localhost:3010';
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return false;
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(url + '/api/authUser', fetchOptions);
    await response.json();
    if (!response.ok) {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const socialLink = document.getElementById('social-link');
const loginLink = document.getElementById('login-link');

if (localStorage.getItem('userInfo')) {
  socialLink.classList.remove('hidden');
  socialLink.classList.add('block');
  loginLink.classList.add('bg-primary', 'text-gray-950');
  loginLink.innerText = 'Logout';
}

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  if (localStorage.getItem('userInfo')) {
    localStorage.removeItem('userInfo');
    localStorage.setItem('logoutMessage', 'Logged out successfully');
    window.location.href = 'index.html';
    console.log('index');
  } else {
    window.location.href = 'login.html';
    console.log('login');
  }
});

const onPageLoad = async () => {

  const currentPagePath = window.location.pathname;
  if (currentPagePath.includes('comments.html')) {
    const isAuthenticated = await authUser();
    if (isAuthenticated) {
      document.body.classList.remove('hidden');
    } else {
      localStorage.removeItem('userInfo');
      localStorage.setItem('unauthorizedMessage', 'Unauthorized access');
      window.location.href = 'login.html';
    }
  }
};

window.addEventListener('load', onPageLoad);