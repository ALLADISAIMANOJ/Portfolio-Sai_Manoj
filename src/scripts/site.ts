export {};

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const tint = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
if (toggle) {
  const label = () => {
    const light = root.dataset.theme === 'light';
    toggle.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
    if (tint) tint.content = light ? '#fbfbfd' : '#07070b';
  };
  label();
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const value = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = value;
    label();
    try { localStorage.setItem('aurora-theme', value); }
    catch (error) {
      if (!(error instanceof DOMException && ['SecurityError', 'QuotaExceededError'].includes(error.name))) throw error;
      console.info('Theme changed for this page. Browser storage is unavailable.');
    }
  });
}

const menu = document.querySelector<HTMLButtonElement>('[data-menu]');
const nav = document.querySelector<HTMLElement>('.nav');
if (menu && nav) {
  const setOpen = (open: boolean) => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menu.hidden = false;
  nav.classList.add('enhanced');
  menu.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); menu.focus(); }
  });
  document.addEventListener('pointerdown', (e) => {
    if (e.target instanceof Node && !nav.contains(e.target)) setOpen(false);
  });
  matchMedia('(min-width: 921px)').addEventListener('change', () => setOpen(false));
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a.nl')];
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      links.forEach((a) => {
        if (a.hash === `#${e.target.id}`) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  for (const a of links) {
    const section = a.hash && document.getElementById(a.hash.slice(1));
    if (section) observer.observe(section);
  }
}
