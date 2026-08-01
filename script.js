/**
 * Developer Portfolio Interactive Logic
 * Abhishek Sati - CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
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
  // Select discrete components to avoid nested animation glitches
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
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- Toast Notification System ---
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
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

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, 4000);
  };

  // --- Form Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').trim();
      const email = (formData.get('email') || '').trim();
      const message = (formData.get('message') || '').trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.style.color = '#ef4444';
          formStatus.textContent = '// Please populate all telemetry fields.';
        }
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!emailRegex.test(email)) {
        if (formStatus) {
          formStatus.style.color = '#ef4444';
          formStatus.textContent = '// Invalid email protocol format.';
        }
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Visual success feedback
      if (formStatus) {
        formStatus.style.color = 'var(--primary)';
        formStatus.textContent = '// Connection established. Uplink sent successfully.';
      }

      showToast('Uplink message sent successfully! Thanks for connecting.', 'success');
      contactForm.reset();

      // Clear inline status after delay
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = '';
        }
      }, 5000);
    });
  }
});
