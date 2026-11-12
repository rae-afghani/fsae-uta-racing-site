// Each video block has its own play button and scroll fade. The blueprint is
// optional and lines up with the first video block on the page.
document.querySelectorAll('[data-template="hero"]').forEach((hero, index) => {
  const video = hero.querySelector('video');
  const button = hero.querySelector('.hero-film-button');
  const screen = index === 0 ? document.querySelector('[data-template="intro"]') : null;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  function updatePlaybackLabel() {
    button.setAttribute('aria-label', video.paused ? 'Play footage' : 'Pause footage');
    button.querySelector('[data-film-play]').toggleAttribute('hidden', !video.paused);
    button.querySelector('[data-film-pause]').toggleAttribute('hidden', video.paused);
  }

  function playFootage() {
    video.play().catch(updatePlaybackLabel);
  }

  button.addEventListener('click', () => {
    if (video.paused || video.ended) playFootage();
    else video.pause();
  });
  ['play', 'pause', 'ended'].forEach(event => video.addEventListener(event, updatePlaybackLabel));

  const stage = video.closest('.hero-film-stage');
  const header = document.querySelector('header');
  let scrollFrame = 0;

  function updateScrollFade() {
    scrollFrame = 0;
    const traveled = header.offsetHeight - hero.getBoundingClientRect().top;
    const progress = Math.min(1, Math.max(0, traveled / stage.offsetHeight));
    stage.style.setProperty('--hero-fade', motion.matches ? 0 : progress ** 2 * .62);
  }

  updateScrollFade();
  window.addEventListener('resize', updateScrollFade);
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollFade);
  }, {passive:true});

  if (motion.matches) return;
  if (!screen || location.hash || window.scrollY > 0) {
    if (index === 0) playFootage();
    return;
  }

  const root = hero;
  let leaving = false;
  let revealTimer;

  // Use the same box as the video, so the drawing still lines up on a phone.
  function positionDrawing() {
    const {top, left, width, height} = video.getBoundingClientRect();
    screen.style.setProperty('--shot-top', top + 'px');
    screen.style.setProperty('--shot-left', left + 'px');
    screen.style.setProperty('--shot-width', width + 'px');
    screen.style.setProperty('--shot-height', height + 'px');
  }

  function closeIntro() {
    root.classList.add('has-intro-played');
    root.classList.remove('is-intro-playing', 'is-intro-revealing');
    window.removeEventListener('resize', positionDrawing);
    window.removeEventListener('scroll', positionDrawing);
    document.removeEventListener('keydown', dismissWithKeyboard);
    screen.hidden = true;
  }

  function reveal(immediate = false) {
    if (leaving) return;
    leaving = true;
    clearTimeout(revealTimer);
    if (immediate) {
      closeIntro();
      if (!motion.matches) playFootage();
      return;
    }
    screen.classList.add('is-leaving');
    // Bring in the hero copy as the grid clears, then start motion under the fading trace.
    setTimeout(() => root.classList.add('is-intro-revealing'), 680);
    setTimeout(() => { if (!motion.matches) playFootage(); }, 1030);
    setTimeout(closeIntro, 1350);
  }

  function dismissWithKeyboard(event) {
    if (event.key === 'Escape' || event.key === 'Tab') reveal(true);
  }

  positionDrawing();
  document.fonts?.ready.then(() => { if (!leaving) positionDrawing(); });
  window.addEventListener('resize', positionDrawing);
  window.addEventListener('scroll', positionDrawing, {passive:true});
  document.addEventListener('keydown', dismissWithKeyboard);
  root.classList.add('is-intro-playing');
  screen.hidden = false;
  revealTimer = setTimeout(reveal, 990);
});
