// Sama, these small helpers run on every page. The links themselves live in HTML
// so the site still works if somebody has JavaScript turned off.
const header = document.querySelector('header');
const menuButton = header.querySelector('[data-menu]');
const navigation = header.querySelector('nav');
header.classList.add('has-menu');

function setMenu(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => setMenu(!navigation.classList.contains('open')));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});

document.querySelectorAll('[data-copyright-year]').forEach(year => {
  year.textContent = new Date().getFullYear();
});

// Sticky build cards use this measurement to stop below the menu, even on phones.
function measureHeader() {
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
}
measureHeader();
window.addEventListener('resize', measureHeader);
if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
