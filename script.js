const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const schoolEmail = 'REPLACE_WITH_OFFICIAL_SCHOOL_EMAIL';
  if (schoolEmail.startsWith('REPLACE_')) {
    document.getElementById('form-note').textContent =
      'Demo form: add the school’s official email address in script.js before publishing. No message has been sent.';
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent('Website enquiry from ' + data.get('name'));
  const body = encodeURIComponent(
    'Name: ' + data.get('name') + '\\nEmail: ' + data.get('email') +
    '\\nEnquiring as: ' + data.get('interest') + '\\n\\n' + data.get('message')
  );
  window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${body}`;
});
