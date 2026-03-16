document.addEventListener('DOMContentLoaded', () => {
  const supportedLanguages = ['de', 'en', 'fr'];
  const storageKey = 'hpsPreferredLanguage';

  const getLanguageFromPath = (path) => {
    const match = String(path || '').toLowerCase().match(/^\/(de|en|fr)(?:\/|$)/);
    return match ? match[1] : null;
  };

  const currentLanguage = getLanguageFromPath(window.location.pathname);
  if (currentLanguage) {
    document.documentElement.lang = currentLanguage;
  }

  const languageLinks = document.querySelectorAll('.lang-switch a.lang[href]');
  languageLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetLanguage = getLanguageFromPath(new URL(link.getAttribute('href'), window.location.href).pathname);
      if (!targetLanguage || !supportedLanguages.includes(targetLanguage)) {
        return;
      }

      try {
        localStorage.setItem(storageKey, targetLanguage);
      } catch (error) {
        // Ignore storage errors (e.g. private mode restrictions).
      }
    });
  });

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
      window.location.href = `mailto:contact@herrarpowersolution.com?subject=Website%20Contact&body=${body}`;
    });
  }
});
