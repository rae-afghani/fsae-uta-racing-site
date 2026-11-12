// Edit these descriptions when the team has new specs or stories to share.
const parts = {
  front: {
    number: 'SYSTEM 01 / 03',
    title: 'Front Wing',
    copy: 'A front aerodynamic element can help shape airflow around the vehicle and influence front-end downforce. Its geometry must balance grip, drag, and competition rules.'
  },
  chassis: {
    number: 'SYSTEM 02 / 03',
    title: 'Chassis & Body',
    copy: 'The central structure connects the car’s critical systems. Packaging, rigidity, and weight distribution influence how the car responds on track.'
  },
  rear: {
    number: 'SYSTEM 03 / 03',
    title: 'Rear Wing',
    copy: 'A rear aerodynamic element can generate downforce to support high-speed stability. Designers evaluate its drag, mounting, and interaction with airflow from the rest of the car.'
  }
};

const legacy = {
  2026: [
    'F26 track debut',
    'UTA debuted the F26, its 2027 combustion car, at Texas Autocross in October 2026.',
    'https://www.uta.edu/news/news-releases/2026/10/19/uta-debuts-its-fastest-formula-sae-car-yet'
  ],
  2025: [
    'UTA at Texas Autocross',
    'UTA Racing brought its 2025 car to Texas Autocross and opened its shop to visitors during the weekend.',
    'https://www.uta.edu/academics/schools-colleges/engineering/academics/departments/mechanical-aerospace/events-news/2025-10-23-texas-autocross-weekend-2025'
  ],
  1998: [
    '1998 combustion car',
    'An alumnus drove this car at the 2026 Texas Autocross. UTA reports that its engine revs to 19,000 rpm.',
    'https://www.uta.edu/news/news-releases/2026/10/19/uta-debuts-its-fastest-formula-sae-car-yet'
  ],
  1982: [
    'UTA Racing founded',
    'The UT Arlington Formula SAE team dates to 1982. Its students design and build formula-style cars for competition.',
    'https://www.uta.edu/news/news-releases/2024/10/16/engines-roar-at-utas-auto-cross-week-end'
  ]
};

// Sama, each section looks for its own buttons. This lets you paste a second
// copy of a section into a page without its buttons changing the first copy.
document.querySelectorAll('[data-template="car"]').forEach(section => {
  const buttons = section.querySelectorAll('[data-part]');
  function selectPart(key) {
    const part = parts[key];
    section.querySelector('[data-part-number]').textContent = part.number;
    section.querySelector('[data-part-title]').textContent = part.title;
    section.querySelector('[data-part-copy]').textContent = part.copy;
    buttons.forEach(button => {
      const selected = button.dataset.part === key;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => selectPart(button.dataset.part)));
  selectPart(section.querySelector('[data-part].active')?.dataset.part || 'chassis');
});

document.querySelectorAll('[data-template="legacy"]').forEach(section => {
  const buttons = section.querySelectorAll('[data-year]');
  buttons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      const [title, copy, source] = legacy[button.dataset.year];
      buttons.forEach(item => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      section.querySelector('[data-legacy-title]').textContent = title;
      section.querySelector('[data-legacy-copy]').textContent = copy;
      section.querySelector('[data-legacy-art]').textContent = button.dataset.year;
      section.querySelector('[data-legacy-source]').href = source;
    });
  });
});

document.querySelectorAll('[data-template="sponsors"]').forEach(section => {
  const marquee = section.querySelector('.sponsor-marquee');
  const toggle = section.querySelector('.sponsor-marquee-toggle');
  toggle.addEventListener('click', () => {
    const paused = marquee.dataset.paused !== 'true';
    marquee.dataset.paused = String(paused);
    toggle.textContent = paused ? 'Resume logos' : 'Pause logos';
  });
});

// Start counters when they become visible. The HTML already contains the final
// numbers so anyone who prefers reduced motion can read them right away.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      observer.unobserve(counter);
      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      let startTime;
      function tick(now) {
        startTime ??= now;
        const progress = Math.min((now - startTime) / 950, 1);
        const value = Math.round(target * (1 - (1 - progress) ** 3));
        counter.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  });
  document.querySelectorAll('[data-count]').forEach(counter => observer.observe(counter));
}
