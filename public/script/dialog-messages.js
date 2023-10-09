"use strict";

const dialog = document.getElementById("modal1");
dialog.classList.add('text-xl', 'w-max-fit', 'bg-tetriary', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialog.addEventListener("click", () => {
  dialog.close();
});

const logoutMessage = localStorage.getItem('logoutMessage');
if (logoutMessage) {
    dialog.innerText = logoutMessage;
    dialog.showModal();
    localStorage.removeItem('logoutMessage');
    setTimeout(() => {
        dialog.close();
    } , 500);
};

const loginMessage = localStorage.getItem('loginMessage');
if (loginMessage) {
    dialog.innerText = loginMessage;
    dialog.showModal();
    localStorage.removeItem('loginMessage');
    setTimeout(() => {
        dialog.close();
    } , 500);
};

const registerMessage = localStorage.getItem('registerMessage');
if (registerMessage) {
    dialog.innerText = registerMessage;
    dialog.showModal();
    localStorage.removeItem('registerMessage');
    setTimeout(() => {
        dialog.close();
    } , 500);
};