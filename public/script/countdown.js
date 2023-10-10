'use strict';

const streamURL = 'http://195.148.104.124:1935/jakelu/cakeve/playlist.m3u8';
// TODO: Change right path to stream record file
const recordedStreamFilePath = './video/stream_record.mp4';
// TODO: Change right starting time for countdown
const streamStartTime = new Date('October 11, 2023 14:15:00');
console.log(streamStartTime.toString());
const goToLiveBtn = document.querySelector('#go-to-live-btn');
const liveHeading = document.querySelector('#live-heading');
const countdown = document.querySelector('#countdown');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const daysString = document.querySelector('#days-string');
const hoursString = document.querySelector('#hours-string');
const minutesString = document.querySelector('#minutes-string');
const secondsString = document.querySelector('#seconds-string');
let waitingParagraphList = document.querySelectorAll('#waiting');
const player = videojs('my-player');
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
    waitingParagraphList = [...waitingParagraphList].map((element) => {
      element.innerHTML = '';
      return element;
    });
  } catch (error) {
    console.log(error);
  }
};

const getRecordedStreamFile = async () => {
  try {
    const response = await fetch(recordedStreamFilePath);

    if (response.status === 404) {
      liveHeading.innerHTML = 'Live OFFLINE';
      waitingParagraphList = [...waitingParagraphList].map((element) => {
        element.innerHTML = 'Live event is offline. Please come back later.';
        return element;
      });
      return;
    }

    if (response.status !== 200) {
      throw new Error('Network error');
    }

    liveHeading.innerHTML = 'Live RECORDING';
    waitingParagraphList = [...waitingParagraphList].map((element) => {
      element.innerHTML = `Missed the live event? Don't worry you can still watch the recording of the live event.`;
      return element;
    });
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
  liveHeading.innerHTML = `
    <span class="inline-flex items-center justify-center">
      Live ON
      <span class="relative flex h-5 w-5 ml-4">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-5 w-5 bg-secondary"
        ></span>
      </span>
    </span>`;
};

const renderLiveOnButton = () => {
  goToLiveBtn.innerHTML = `
      Live now!
      <span class="relative flex h-4 w-4 ml-2">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-300 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-4 w-4 bg-secondary"
        ></span>
      </span>`;
};

const renderCountdown = (distance) => {
  const daysCount = Math.floor(distance / day);
  const hoursCount = Math.floor((distance % day) / hour);
  const minutesCount = Math.floor((distance % hour) / minute);
  const secondsCount = Math.floor((distance % minute) / second);

  daysString.innerHTML = daysCount === 1 ? 'day' : 'days';
  hoursString.innerHTML = hoursCount === 1 ? 'hour' : 'hours';
  minutesString.innerHTML = minutesCount === 1 ? 'minute' : 'minutes';
  secondsString.innerHTML = 'seconds';
  days.innerHTML = daysCount;
  hours.innerHTML = hoursCount;
  minutes.innerHTML = minutesCount;
  seconds.innerHTML = secondsCount;
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
