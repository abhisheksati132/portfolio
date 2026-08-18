/**
 * Developer Portfolio Interactive Logic
 * Abhishek Sati - CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Contact Form Endpoint (Web3Forms) ---
  // Your access key is set as a hidden field in index.html.
  const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

  // --- Navigation & Mobile Menu Handler ---
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  const closeMenu = () => {
    if (siteNav && menuToggle) {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  };

  const toggleMenu = () => {
    if (siteNav && menuToggle) {
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', isOpen);
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      siteNav &&
      menuToggle &&
      siteNav.classList.contains('open') &&
      !siteNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close mobile menu when a navigation link is clicked
  if (siteNav) {
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // --- Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll(
    '.about-info, .about-cards > *, .skills-grid > *, .project-showcase, .timeline-item, .education-card, .contact-info, .contact-form'
  );

  if ('IntersectionObserver' in window) {
    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger animation only once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => {
      el.classList.add('reveal');
      revealOnScroll.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- Toast Notification System ---
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('role', 'status');
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 4 seconds (timeout fallback so toasts always clean up)
    const dismiss = () => {
      toast.classList.remove('show');
      window.setTimeout(() => toast.remove(), 600);
    };
    window.setTimeout(dismiss, 4000);
  };

  // --- Form Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnLabel = document.getElementById('submitBtnLabel');

  const setStatus = (message, color) => {
    if (formStatus) {
      formStatus.style.color = color;
      formStatus.textContent = message;
    }
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').trim();
      const email = (formData.get('email') || '').trim();
      const message = (formData.get('message') || '').trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        setStatus('// Please populate all telemetry fields.', '#ef4444');
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!emailRegex.test(email)) {
        setStatus('// Invalid email protocol format.', '#ef4444');
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtnLabel) submitBtnLabel.textContent = 'Transmitting...';
      }

      try {
        if (FORM_ENDPOINT) {
          const payload = new FormData(contactForm);

          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: payload
          });

          if (!res.ok) throw new Error('Request failed');

          setStatus('// Connection established. Uplink sent successfully.', 'var(--primary)');
          showToast('Message sent successfully! Thanks for connecting.', 'success');
          contactForm.reset();
        } else {
          // Fallback: open the visitor's mail client with the message pre-filled
          const subject = encodeURIComponent(`Portfolio contact from ${name}`);
          const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
          window.location.href = `mailto:Abhisheksativit@gmail.com?subject=${subject}&body=${body}`;
          setStatus('// Opening your mail client to send the message...', 'var(--primary)');
          showToast('Your mail client should open to send the message.', 'success');
        }
      } catch (err) {
        setStatus('// Uplink failed. Please email me directly or try again.', '#ef4444');
        showToast('Could not send the message. Please email me directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtnLabel) submitBtnLabel.textContent = 'Send Message';
        }
        window.setTimeout(() => {
          if (formStatus && !FORM_ENDPOINT) {
            formStatus.textContent = '';
          }
        }, 6000);
      }
    });
  }

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    if (!progressBar) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const percent = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    progressBar.style.width = percent + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // --- Scroll-To-Top Button ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // --- Active Navigation Link Highlighting ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a');

  const updateActiveNav = () => {
    const pos = window.scrollY + 140;
    let current = '';
    sections.forEach(section => {
      if (pos >= section.offsetTop) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  const onScroll = () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('show', window.scrollY > 600);
    }
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateActiveNav();

  // --- Terminal Typewriter Effect ---
  const typeTarget = document.getElementById('typeTarget');
  if (typeTarget) {
    const commands = [
      'npm run deploy --all',
      'cat about.md',
      'git push --production',
      'start telemetry_server',
      'ls ./projects'
    ];

    if (prefersReducedMotion) {
      typeTarget.textContent = commands[0];
    } else {
      let cmdIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const command = commands[cmdIndex];
        if (!deleting) {
          typeTarget.textContent = command.slice(0, charIndex++);
          if (charIndex > command.length) {
            deleting = true;
            window.setTimeout(type, 2000);
            return;
          }
          window.setTimeout(type, 75);
        } else {
          typeTarget.textContent = command.slice(0, charIndex--);
          if (charIndex < 0) {
            deleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
          }
          window.setTimeout(type, 32);
        }
      };

      window.setTimeout(type, 1200);
    }
  }
});
