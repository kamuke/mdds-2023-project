"use strict";

const url = 'http://localhost:3010';
const form = document.getElementById('registerForm');

const dialog = document.getElementById("modal");
dialog.classList.add('w-max-fit', 'bg-secondary', 'text-gray-100', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialog.addEventListener("click", () => {
  dialog.close();
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
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  dialog.innerHTML = "Registered successfully";
  dialog.showModal();
  setTimeout(() => {
    window.location.href = 'login.html';
    } , 500);
  } catch (e) {
    dialog.innerHTML = e.message;
    dialog.showModal();
    console.log(e.message);
  }
});