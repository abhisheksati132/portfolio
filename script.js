const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

menuToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    siteNav.classList.remove('open');
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  formStatus.textContent = 'Thanks! Your message is ready to send.';
  contactForm.reset();
});
