// --- Navigation & Mobile Menu Handler ---
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
  // Simple menu button animation state
  menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
    siteNav.classList.remove('open');
    menuToggle.classList.remove('active');
  }
});

// Close mobile menu when a link is clicked
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});


// --- Intersection Observer for Scroll Reveals ---
const revealElements = document.querySelectorAll('.glass-card, .section-grid, .skills-grid > *, .timeline-item, .education-card');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Trigger animation only once
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Initialize elements with reveal class and observe
revealElements.forEach(el => {
  el.classList.add('reveal');
  revealOnScroll.observe(el);
});


// --- Form Submission Handling (with visual feedback states) ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    formStatus.style.color = '#ef4444'; // Red color for error
    formStatus.textContent = '// Please populate all telemetry fields.';
    return;
  }

  // Visual success feedback
  formStatus.style.color = 'var(--primary)';
  formStatus.textContent = '// Connection established. Uplink sent successfully. Thanks!';
  
  contactForm.reset();
  
  // Clear message after delay
  setTimeout(() => {
    formStatus.textContent = '';
  }, 5000);
});
