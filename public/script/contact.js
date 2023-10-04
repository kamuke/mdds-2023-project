import PUBLIC_KEY from '../emailjs.config.js';
('use strict');
const contactForm = document.getElementById('contactForm');

const initEmailJS = () => {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init(PUBLIC_KEY);
};

initEmailJS();

window.onload = () => {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // generate a five digit number for the contact_number variable
    document.getElementById('contactNumber').value =
      (Math.random() * 100000) | 0;
    // send form through emailjs
    emailjs.sendForm('metrocine_contact', 'contact_form', contactForm).then(
      () => {
        console.log('SUCCESS!');
        // TODO: do nicer modals than alerts
        alert('Contact send! Thank you!');
        contactForm.reset();
      },
      (error) => {
        console.log('FAILED...', error);
        alert(
          'Something went wrong while sending your contact... Please try again after a while.'
        );
      }
    );
  });
};
