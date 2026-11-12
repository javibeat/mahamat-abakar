(() => {
  // Nav border once the page scrolls
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = nav.querySelector('.nav__toggle');
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.mnav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  // Gentle fade-in as sections enter the screen
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.fade').forEach((el) => el.classList.add('in'));
  }

  // Portfolio filter
  const tabs = document.querySelectorAll('.tab');
  const tiles = document.querySelectorAll('.tile');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const f = tab.dataset.filter;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      tiles.forEach((tile) => tile.classList.toggle('is-hidden', f !== 'all' && tile.dataset.cat !== f));
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
