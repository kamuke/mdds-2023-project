window.addEventListener('scroll', (e) => {
  const layers = document.querySelectorAll('[data-type="parallax"]');
  const top = this.scrollY;
  let layer, speed, yPos;

  for (let i = 0; i < layers.length; i++) {
    layer = layers[i];
    speed = layer.getAttribute('data-speed');
    yPos = -((top * speed) / 100);
    layer.setAttribute(
      'style',
      'transform: translate3d(0px, ' + yPos + 'px, 0px)'
    );
  }
});
