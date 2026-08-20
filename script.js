/**
 * Developer Portfolio Interactive Logic
 * Abhishek Sati - CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Day / Night Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyThemeIcon = () => {
    const stored = document.documentElement.getAttribute('data-theme');
    const isDark = stored ? stored === 'dark' : darkQuery.matches;
    if (themeToggle) {
      themeToggle.dataset.theme = isDark ? 'dark' : 'light';
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
    if (themeMeta) themeMeta.content = isDark ? '#262624' : '#FAF9F5';
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = themeToggle.dataset.theme === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      applyThemeIcon();
    });
  }

  applyThemeIcon();
  darkQuery.addEventListener('change', applyThemeIcon);

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
    '.about-info, .about-cards > *, .skills-grid > *, .project-showcase, .education-card, .contact-info, .contact-form'
  );

  if ('IntersectionObserver' in window) {
    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Animate only once
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
      window.setTimeout(() => toast.remove(), 500);
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
        setStatus('Please fill in all the required fields.', 'var(--error)');
        showToast('Please fill in all the required fields.', 'error');
        return;
      }

      if (!emailRegex.test(email)) {
        setStatus('Please enter a valid email address.', 'var(--error)');
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitBtnLabel) submitBtnLabel.textContent = 'Sending...';
      }

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Request failed');

        setStatus('Message sent. Thank you for reaching out!', 'var(--success)');
        showToast('Message sent successfully. Thank you!', 'success');
        contactForm.reset();
      } catch (err) {
        setStatus('Something went wrong. Please try again or email me directly.', 'var(--error)');
        showToast("Couldn't send the message. Please try again or email me directly.", 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtnLabel) submitBtnLabel.textContent = 'Send Message';
        }
        window.setTimeout(() => {
          if (formStatus) formStatus.textContent = '';
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

  // --- Animated Stat Counters ---
  const statBlock = document.querySelector('.hero-stats');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const pad = parseInt(el.dataset.pad || '0', 10);
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = decimals > 0
        ? value.toFixed(decimals)
        : String(Math.round(value)).padStart(pad, '0');
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (statBlock) {
    if (prefersReducedMotion) {
      statBlock.querySelectorAll('[data-count]').forEach(el => {
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const pad = parseInt(el.dataset.pad || '0', 10);
        el.textContent = decimals > 0
          ? parseFloat(el.dataset.count).toFixed(decimals)
          : String(Math.round(parseFloat(el.dataset.count))).padStart(pad, '0');
      });
    } else {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            statBlock.querySelectorAll('[data-count]').forEach(animateCount);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counterObserver.observe(statBlock);
    }
  }

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
  const siteHeader = document.querySelector('.site-header');

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
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateActiveNav();

  // --- Cursor Spotlight on Project Cards ---
  document.querySelectorAll('.project-showcase').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });

  // --- Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'Abhisheksativit@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!', 'success');
        const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
        if (tooltip) tooltip.textContent = 'Copied!';
        setTimeout(() => {
          if (tooltip) tooltip.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        showToast(`Email: ${email}`, 'success');
      }
    });
  }

  // --- Keyboard Shortcuts Navigation ---
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const key = e.key.toLowerCase();
    if (key === 't' && themeToggle) {
      themeToggle.click();
    } else if (key === 'p') {
      document.getElementById('projects')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else if (key === 'c') {
      document.getElementById('contact')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else if (key === 'a') {
      document.getElementById('about')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});