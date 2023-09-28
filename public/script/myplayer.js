let myPlayer = document.querySelector('.video-js');

videojs(myPlayer, {
  controls: true,
  autoplay: false,
  fluid: true,
  preload: 'auto',
  fullscreen: { options: { navigationUI: 'hide' } },
});
