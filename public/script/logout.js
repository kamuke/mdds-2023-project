"use strict";

const dialog = document.getElementById("modal");
dialog.classList.add('w-max-fit', 'bg-secondary', 'text-gray-100', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialog.addEventListener("click", () => {
  dialog.close();
});

const logoutMessage = localStorage.getItem('logoutMessage');
if (logoutMessage) {
    console.log('logoutMessage', logoutMessage);
    dialog.innerHTML = logoutMessage;
    dialog.showModal();
    localStorage.removeItem('logoutMessage');
};