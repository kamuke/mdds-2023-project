'use strict';

const countdown = document.querySelector('#countdown');
const end = new Date('October 11, 2023 13:00:00');

console.log(end);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let timer;

function showRemaining() {
  const now = new Date();
  const distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    countdown.innerHTML = 'EXPIRED!';

    return;
  }
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  countdown.innerHTML = days + 'days ';
  countdown.innerHTML += hours + 'hrs ';
  countdown.innerHTML += minutes + 'mins ';
  countdown.innerHTML += seconds + 'secs';
}

timer = setInterval(showRemaining, 1000);
