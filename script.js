/**
 * Developer Portfolio Interactive Logic
 * Abhishek Sati - CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SITE_EMAIL = 'abhisheksativit@gmail.com';

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

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    applyThemeIcon();
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = themeToggle.dataset.theme === 'dark' ? 'light' : 'dark';
      if (!prefersReducedMotion && typeof document.startViewTransition === 'function') {
        document.startViewTransition(() => setTheme(next));
      } else {
        setTheme(next);
      }
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

  // Close mobile menu with Escape key and restore focus to the toggle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav && siteNav.classList.contains('open')) {
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  // Trap Tab focus inside the header while the mobile menu is open
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !siteNav || !siteNav.classList.contains('open')) return;
    const themeBtn = document.getElementById('themeToggle');
    const focusables = [themeBtn, menuToggle, ...siteNav.querySelectorAll('a')].filter(Boolean);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
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

    // Cap stacked toasts so the container never overflows
    while (toastContainer.children.length >= 4) {
      toastContainer.firstElementChild.remove();
    }
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

  const setFieldValidity = (field, invalid) => {
    if (!field) return;
    if (invalid) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  };

  const nameField = contactForm ? contactForm.querySelector('#formName') : null;
  const emailField = contactForm ? contactForm.querySelector('#formEmail') : null;
  const messageField = contactForm ? contactForm.querySelector('#formMessage') : null;

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
        [nameField, emailField, messageField].forEach(f => setFieldValidity(f, !f || !f.value.trim()));
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        setStatus('Please enter a valid email address.', 'var(--error)');
        showToast('Please enter a valid email address.', 'error');
        setFieldValidity(nameField, false);
        setFieldValidity(emailField, true);
        setFieldValidity(messageField, false);
        if (emailField) emailField.focus();
        return;
      }

      setFieldValidity(nameField, false);
      setFieldValidity(emailField, false);
      setFieldValidity(messageField, false);

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
        contactForm.reset();      } catch (err) {
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

  // --- Dynamic Footer Year ---
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

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
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
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

  // --- Cursor Spotlight + 3D Tilt on Project Cards ---
  const enableTilt = !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches;
  document.querySelectorAll('.project-showcase').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      if (enableTilt) {
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;
        card.style.setProperty('--rx', `${(-py * 2.4).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(px * 2.4).toFixed(2)}deg`);
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  // --- Local Time in Contact (IST) ---
  const localTime = document.getElementById('localTime');
  if (localTime) {
    try {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      });
      const tickClock = () => { localTime.textContent = fmt.format(new Date()); };
      tickClock();
      window.setInterval(tickClock, 30000);
    } catch (e) {
      localTime.textContent = '';
    }
  }

  // --- Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = SITE_EMAIL;
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
    const active = document.activeElement;
    if (active) {
      const tag = active.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A') return;
      if (active.isContentEditable) return;
    }
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

  // --- Command Palette (Ctrl/Cmd + K) ---
  const initCommandPalette = () => {
    let palette = null;
    let input = null;
    let list = null;
    let isOpen = false;
    let activeIndex = 0;
    let results = [];
    let lastFocused = null;

    const setBackgroundVisibility = (hidden) => {
      ['.site-header', 'main', '.site-footer', '.scroll-top'].forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        if (hidden) el.setAttribute('aria-hidden', 'true');
        else el.removeAttribute('aria-hidden');
      });
      document.body.classList.toggle('no-scroll', hidden);
    };

    const close = () => {
      if (!isOpen || !palette) return;
      palette.hidden = true;
      palette.classList.remove('open');
      isOpen = false;
      setBackgroundVisibility(false);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };

    const open = () => {
      if (!palette) build();
      lastFocused = document.activeElement;
      palette.hidden = false;
      palette.classList.add('open');
      isOpen = true;
      setBackgroundVisibility(true);
      input.value = '';
      renderList();
      requestAnimationFrame(() => input.focus());
    };

    const scrollToSection = (id) => {
      close();
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    const openUrl = (url) => {
      window.open(url, '_blank', 'noopener');
      close();
    };

    const copyEmail = async () => {
      try {
        await navigator.clipboard.writeText(SITE_EMAIL);
        showToast('Email address copied to clipboard!', 'success');
      } catch (err) {
        showToast(`Email: ${SITE_EMAIL}`, 'success');
      }
      close();
    };

    const COMMANDS = [
      { label: 'Go to Home', keywords: 'home top start hero', action: () => scrollToSection('home') },
      { label: 'Go to About', keywords: 'about bio introduction', action: () => scrollToSection('about') },
      { label: 'Go to Skills', keywords: 'skills expertise stack technologies', action: () => scrollToSection('skills') },
      { label: 'Go to Projects', keywords: 'projects work portfolio case studies', action: () => scrollToSection('projects') },
      { label: 'Go to Education', keywords: 'education academics university vit college', action: () => scrollToSection('education') },
      { label: 'Go to Contact', keywords: 'contact email reach hire message form', action: () => scrollToSection('contact') },
      { label: 'NewsAtlas — Live Site', keywords: 'newsatlas news atlas globe map dashboard demo open', action: () => openUrl('https://news-atlas-live.vercel.app/') },
      { label: 'NewsAtlas — Source Code', keywords: 'newsatlas github source code repository', action: () => openUrl('https://github.com/abhisheksati132/newsatlaslive') },
      { label: 'Klipport — Live Site', keywords: 'klipport clipboard sync demo open', action: () => openUrl('https://klipport.vercel.app') },
      { label: 'Klipport — Source Code', keywords: 'klipport github source code repository', action: () => openUrl('https://github.com/abhisheksati132/klipport') },
      { label: 'Whispr — Source Code', keywords: 'whispr messaging encrypted chat github source', action: () => openUrl('https://github.com/abhisheksati132/whispr') },
      { label: 'Toggle Light / Dark Theme', keywords: 'theme dark light night mode appearance toggle switch', hint: 'T', action: () => { if (themeToggle) themeToggle.click(); close(); } },
      { label: 'Copy Email Address', keywords: 'copy email clipboard mail contact', action: copyEmail },
      { label: 'Open Resume (PDF)', keywords: 'resume cv pdf download', action: () => openUrl('assets/Abhishek_Sati_Resume.pdf') },
      { label: 'GitHub Profile', keywords: 'github profile repositories code', action: () => openUrl('https://github.com/abhisheksati132') },
      { label: 'LinkedIn Profile', keywords: 'linkedin profile network career', action: () => openUrl('https://www.linkedin.com/in/abhisheksati132') },
      { label: 'Instagram Profile', keywords: 'instagram profile photos social', action: () => openUrl('https://www.instagram.com/satiabhishek') },
      { label: 'Back to Top', keywords: 'back top scroll up home', action: () => { close(); window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }); } }
    ];

    const scoreCommand = (cmd, q) => {
      const hay = `${cmd.label} ${cmd.keywords}`.toLowerCase();
      if (!q) return 1;
      const idx = hay.indexOf(q);
      if (idx !== -1) return 100 - idx;
      let i = 0;
      for (const ch of hay) {
        if (ch === q[i]) i++;
        if (i === q.length) break;
      }
      return i === q.length ? 10 : -1;
    };

    const setActive = (index) => {
      if (!results.length) return;
      activeIndex = (index + results.length) % results.length;
      list.querySelectorAll('.cmd-item').forEach((item, i) => {
        item.setAttribute('aria-selected', String(i === activeIndex));
        if (i === activeIndex) item.scrollIntoView({ block: 'nearest' });
      });
    };

    const renderList = () => {
      const q = input.value.trim().toLowerCase();
      results = COMMANDS
        .map(cmd => ({ cmd, s: scoreCommand(cmd, q) }))
        .filter(r => r.s >= 0)
        .sort((a, b) => b.s - a.s)
        .map(r => r.cmd);

      list.innerHTML = '';
      if (!results.length) {
        const li = document.createElement('li');
        li.className = 'cmd-empty';
        li.textContent = 'No matching commands';
        list.appendChild(li);
        return;
      }
      results.forEach((cmd, i) => {
        const li = document.createElement('li');
        li.className = 'cmd-item';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', String(i === 0));
        li.innerHTML = `<span>${cmd.label}</span>${cmd.hint ? `<kbd class="cmd-kbd">${cmd.hint}</kbd>` : ''}`;
        li.addEventListener('click', () => cmd.action());
        li.addEventListener('mousemove', () => setActive(i));
        list.appendChild(li);
      });
      activeIndex = 0;
    };

    const build = () => {
      palette = document.createElement('div');
      palette.id = 'cmdPalette';
      palette.className = 'cmd-palette';
      palette.hidden = true;
      palette.innerHTML = `
        <div class="cmd-backdrop"></div>
        <div class="cmd-dialog" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="cmd-input-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="cmd-input" placeholder="Type a command or search..." autocomplete="off" spellcheck="false" aria-label="Search commands" />
            <kbd class="cmd-kbd">Esc</kbd>
          </div>
          <ul class="cmd-list" role="listbox" aria-label="Commands"></ul>
        </div>`;
      document.body.appendChild(palette);
      input = palette.querySelector('.cmd-input');
      list = palette.querySelector('.cmd-list');

      palette.querySelector('.cmd-backdrop').addEventListener('click', close);
      palette.querySelector('.cmd-dialog').addEventListener('click', (e) => e.stopPropagation());
      input.addEventListener('input', renderList);
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        input.focus();
      });
    };

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) { close(); } else { open(); }
        return;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowDown' && results.length) {
        e.preventDefault();
        setActive(activeIndex + 1);
      } else if (e.key === 'ArrowUp' && results.length) {
        e.preventDefault();
        setActive(activeIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[activeIndex]) results[activeIndex].action();
      }
    });
  };

  try {
    initCommandPalette();
  } catch (err) {
    console.warn('Command palette failed to initialise:', err);
  }

  // --- GitHub Stats Embed: fail silently if third-party is down ---
  const statsImg = document.querySelector('.github-stats img');
  if (statsImg) {
    statsImg.addEventListener('error', () => {
      statsImg.closest('.github-stats')?.remove();
    });
  }

  // --- Service Worker Registration ---
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const incoming = reg.installing;
            if (!incoming) return;
            incoming.addEventListener('statechange', () => {
              if (incoming.state === 'activated' && navigator.serviceWorker.controller) {
                showToast('Portfolio updated to the latest version.', 'success');
              }
            });
          });
        })
        .catch((err) => console.warn('Service worker registration failed:', err));
    });
  }
});