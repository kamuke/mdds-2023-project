'use strict';

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

const onPageLoad = async () => {
  const currentPagePath = window.location.pathname;
  if (currentPagePath.includes('comments.html')) {
    const isAuthenticated = await authUser();
    if (isAuthenticated) {
      document.body.classList.remove('hidden');
    } else {
      window.location.href = 'login.html';
      localStorage.removeItem('userInfo');
    }
  }
};
window.addEventListener('load', onPageLoad);