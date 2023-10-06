"use strict";

const dialog = document.getElementById("modal1");
dialog.classList.add('text-xl', 'w-max-fit', 'bg-tetriary', 'text-gray-950', 'text-center', 'rounded-lg', 'p-4', 'm-auto', 'focus:outline-none');
dialog.addEventListener("click", () => {
  dialog.close();
});

const logoutMessage = localStorage.getItem('logoutMessage');
if (logoutMessage) {
    console.log('logoutMessage', logoutMessage);
    dialog.innerHTML = logoutMessage;
    dialog.showModal();
    localStorage.removeItem('logoutMessage');
    setTimeout(() => {
        dialog.close();
    } , 500);
};