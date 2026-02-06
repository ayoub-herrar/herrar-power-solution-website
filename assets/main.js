document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const navWrap = document.querySelector('[data-nav-wrap]');

  if (toggle && navWrap) {
    toggle.addEventListener('click', () => {
      const isOpen = navWrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]')?.value?.trim() || '';
      const email = form.querySelector('[name="email"]')?.value?.trim() || '';
      const message = form.querySelector('[name="message"]')?.value?.trim() || '';
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:info@herrar-power.com?subject=Website%20Contact&body=${body}`;
    });
  }

  const langLinks = document.querySelectorAll('[data-lang]');
  if (langLinks.length > 0) {
    const path = window.location.pathname.split('/').filter(Boolean);
    const page = path[path.length - 1] || 'index.html';
    langLinks.forEach((link) => {
      const lang = link.getAttribute('data-lang');
      if (lang) link.setAttribute('href', `/${lang}/${page}`);
    });
  }
});
