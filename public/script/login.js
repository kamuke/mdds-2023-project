"use strict";

const url = 'http://localhost:3000';
const form = document.getElementById('loginForm');

const dialogSuccess = document.getElementById("modal1");
dialogSuccess.classList.add('bg-tetriary', 'text-xl', 'w-max-fit', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialogSuccess.addEventListener("click", () => {
  dialogSuccess.close();
});
const dialogFail = document.getElementById("modal2");
dialogFail.classList.add('bg-red-500', 'text-xl', 'w-max-fit', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialogFail.addEventListener("click", () => {
  dialogFail.close();
});


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
    localStorage.setItem('loginMessage', 'Logged in successfully');
    localStorage.setItem('userInfo', JSON.stringify(json));
    window.location.href = 'index.html';
  } catch (e) {
    dialogFail.innerHTML = e.message;
    dialogFail.showModal();
    setTimeout(() => {
      dialogFail.close();
    } , 500);
    localStorage.removeItem('userInfo');
    console.log(e.message);
  }
});

  const unauthorizedMessage = localStorage.getItem('unauthorizedMessage');
  if (unauthorizedMessage) {
      console.log('unauthorizedMessage', unauthorizedMessage);
      dialogFail.innerHTML = unauthorizedMessage;
      dialogFail.showModal();
      setTimeout(() => {
        dialogFail.close();
      } , 500);
      localStorage.removeItem('unauthorizedMessage');
  };