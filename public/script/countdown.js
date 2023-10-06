'use strict';

// TODO: Change right stream url
const streamURL =
  'http://195.148.104.124:1935/jakelu/testistriimi/playlist.m3u8';
// TODO: Change right path to stream file
const recordedStreamFilePath = './video/placeholder_stream_record.mp4';
const heroButtonsContainer = document.querySelector('#hero-buttons');
const liveHeading = document.querySelector('#live-heading');
const waitingParagraph = document.querySelector('#waiting');
const player = videojs('my-player');
// TODO: Change right starting time for countdown
const streamStartTime = new Date('October 11, 2023 12:00:00');
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let timer;

const getStream = async () => {
  try {
    const response = await fetch(streamURL);

    if (response.status === 404) {
      getRecordedStreamFile();
      return;
    }

    if (response.status !== 200) {
      throw new Error('Network error');
    }

    changePlayerSource(streamURL, 'application/x-mpegURL', true);
    renderLiveOnHeading();
    renderLiveOnButton();
    waitingParagraph.innerHTML = '';
  } catch (error) {
    console.log(error);
  }
};

const getRecordedStreamFile = async () => {
  try {
    const response = await fetch(recordedStreamFilePath);

    if (response.status === 404) {
      liveHeading.innerHTML = `Live OFFLINE`;
      waitingParagraph.innerHTML = `Live event is offline. Please come back later.`;
      return;
    }

    if (response.status !== 200) {
      throw new Error('Network error');
    }

    liveHeading.innerHTML = 'Live RECORDING';
    waitingParagraph.innerHTML = `Missed the live event? Don't worry you can still watch the recording of the live event.`;
    changePlayerSource(recordedStreamFilePath, 'video/mp4', false);
  } catch (error) {
    console.log(error);
  }
};

const checkIsStreamOnline = async () => {
  try {
    const response = await fetch(streamURL);

    if (response.status === 404) {
      clearInterval(timer);
      getRecordedStreamFile();
      return;
    }

    if (response.status !== 200) {
      throw new Error('Network error');
    }
  } catch (error) {
    console.log(error);
  }
};

const renderLiveOnHeading = () => {
  liveHeading.innerHTML = `Live ON
  <span class="relative flex h-5 w-5 ml-4">
    <span
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
    ></span>
    <span
      class="relative inline-flex rounded-full h-5 w-5 bg-secondary"
    ></span>
  </span>`;
};

const renderLiveOnButton = () => {
  heroButtonsContainer.insertAdjacentHTML(
    'afterbegin',
    `<a
    href="#live"
    class="transition-all inline-flex items-center justify-center rounded-lg px-4 py-2 mr-4 text-gray-950 border-2 bg-primary border-primary uppercase font-semibold hover:border-transparent hover:bg-gradient-to-tr from-primary to-tetriary"
    aria-label="Scroll to live"
    >
      Live now!
      <span class="relative flex h-4 w-4 ml-2">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-4 w-4 bg-secondary"
        ></span>
      </span>
    </a>`
  );
};

const renderCountdown = (distance) => {
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  const dayOrDaysString = days === 1 ? 'day ' : 'days ';
  const hourOrHoursString = hours === 1 ? 'hour ' : 'hours ';
  const minuteOrMinutesString = minutes === 1 ? 'minute ' : 'minutes ';

  liveHeading.innerHTML =
    days > 0 ? 'Live starts in ' + days + dayOrDaysString : 'Live starts in ';
  liveHeading.innerHTML += hours > 0 ? hours + hourOrHoursString : '';
  liveHeading.innerHTML += minutes > 0 ? minutes + minuteOrMinutesString : '';
  liveHeading.innerHTML += seconds + 'secs';
};

const changePlayerSource = (URL, type, autoplay) => {
  player.src({
    type: type,
    src: URL,
  });
  player.autoplay(autoplay);
};

const streamCountdown = () => {
  const now = new Date();
  const distance = streamStartTime - now;

  if (distance < 0) {
    clearInterval(timer);
    timer = setInterval(checkIsStreamOnline, 5000);
    getStream();
    return;
  }

  renderCountdown(distance);
};

timer = setInterval(streamCountdown, 1000);
