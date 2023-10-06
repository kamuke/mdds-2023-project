import PUBLIC_KEY from '../emailjs.config.js';
('use strict');
const contactForm = document.getElementById('contactForm');

const closeBtn = document.createElement('button');
closeBtn.classList.add(
  'bg-gray-950',
  'text-gray-100',
  'rounded-lg',
  'uppercase',
  'px-4',
  'py-2',
  'text-base'
);
closeBtn.innerHTML = 'Close';

const dialogSuccess = document.getElementById('modalSuccess');
const dialogSuccessParagraph = document.getElementById('modalSuccessParagraph');

dialogSuccess.addEventListener('click', () => {
  dialogSuccess.close();
});

const dialogFail = document.getElementById('modalFail');
const dialogFailParagraph = document.getElementById('modalFailParagraph');

dialogFail.addEventListener('click', () => {
  dialogFail.close();
});

const initEmailJS = () => {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init(PUBLIC_KEY);
};

initEmailJS();

window.onload = () => {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // generate a five digit number for contact number
    document.getElementById('contactNumber').value =
      (Math.random() * 100000) | 0;
    // send form through emailjs
    emailjs.sendForm('metrocine_contact', 'contact_form', contactForm).then(
      () => {
        dialogSuccess.append(closeBtn);
        dialogSuccessParagraph.innerHTML =
          'Contact send. Thank you for sending a contact for us!';
        dialogSuccess.showModal();
        contactForm.reset();
      },
      (error) => {
        dialogFail.append(closeBtn);
        dialogFailParagraph.innerHTML =
          'Something went wrong while sending your contact... Please try again after a while.';
        dialogFail.showModal();
        console.log('Contact form sending error:', error);
      }
    );
  });
};
