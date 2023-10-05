'use strict';

// TODO: Change right stream url
const streamURL =
  'http://195.148.104.124:1935/jakelu/testistriimi/playlist.m3u8';
const heroButtonsContainer = document.querySelector('#hero-buttons');
const liveHeading = document.querySelector('#live-heading');
const countdown = document.querySelector('#countdown');
const player = videojs('my-player');
// TODO: Change right starting time for countdown
const streamStartTime = new Date('October 5, 2023 16:20:00');
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let timer;

// <a
//   href="#live"
//   class="transition-all inline-flex items-center justify-center rounded-lg px-4 py-2 mr-4 text-gray-950 border-2 bg-primary border-primary uppercase font-semibold hover:border-transparent hover:bg-gradient-to-tr from-primary to-tetriary"
//   aria-label="Scroll to live"
// >
//   Live now!
//   <span class="relative flex h-4 w-4 ml-2">
//     <span
//       class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
//     ></span>
//     <span
//       class="relative inline-flex rounded-full h-4 w-4 bg-secondary"
//     ></span>
//   </span>
// </a>

const getStream = async () => {
  try {
    const response = await fetch(streamURL);
    if (response.status === 404) {
      return;
    }
    liveHeading.innerHTML = `
                            Live ON
                            <span class="relative flex h-5 w-5 ml-4">
                              <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
                              ></span>
                              <span
                                class="relative inline-flex rounded-full h-5 w-5 bg-secondary"
                              ></span>
                            </span>
                            `;
    heroButtonsContainer.prepend('MOI!');
    changePlayerSource();
  } catch (error) {
    console.log('error', error);
  }
};

const changePlayerSource = () => {
  player.src({
    type: 'application/x-mpegURL',
    src: streamURL,
  });

  player.autoplay(true);
};

const streamCountdown = () => {
  const now = new Date();
  const distance = streamStartTime - now;

  if (distance < 0) {
    clearInterval(timer);
    getStream();
    return;
  }

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  const dayOrDaysString = days === 1 ? 'day ' : 'days ';
  const hourOrHoursString = hours === 1 ? 'hour ' : 'hours ';
  const minuteOrMinutesString = minutes === 1 ? 'minute ' : 'minutes ';

  countdown.innerHTML = days > 0 ? days + dayOrDaysString : '';
  countdown.innerHTML += hours > 0 ? hours + hourOrHoursString : '';
  countdown.innerHTML += minutes > 0 ? minutes + minuteOrMinutesString : '';
  countdown.innerHTML += seconds + 'secs';
};

timer = setInterval(streamCountdown, 1000);
