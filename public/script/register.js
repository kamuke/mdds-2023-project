"use strict";

const url = 'http://localhost:3000';
const form = document.getElementById('registerForm');

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
  const response = await fetch(url + '/api/register', fetchOptions);
  const json = await response.json();
  console.log('json', json);
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  localStorage.setItem('registerMessage', 'Registered successfully');
  window.location.href = 'login.html';
  } catch (e) {
    dialogFail.innerHTML = e.message;
    dialogFail.showModal();
    setTimeout(() => {
      dialogFail.close();
    } , 500);
    console.log(e.message);
  }
});