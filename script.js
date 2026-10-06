/**
 * Developer Portfolio Interactive Architecture
 * Abhishek Sati - CSE (Data Science)
 * High-End Tactile Engineering Interface Logic
 * Zero Em-Dashes | Modern IntersectionObserver | Keyboard Commands
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SITE_EMAIL = 'abhisheksativit@gmail.com';
  const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

  // --- Day / Night Theme Management ---
  const themeToggle = document.getElementById('themeToggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = () => {
    const stored = document.documentElement.getAttribute('data-theme');
    const isDark = stored ? stored === 'dark' : darkQuery.matches;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
    if (themeMeta) {
      themeMeta.content = isDark ? '#09090b' : '#f8f8fa';
    }
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    applyTheme();
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current ? current === 'dark' : darkQuery.matches;
      const next = isDark ? 'light' : 'dark';
      
      if (!prefersReducedMotion && typeof document.startViewTransition === 'function') {
        document.startViewTransition(() => setTheme(next));
      } else {
        setTheme(next);
      }
    });
  }

  applyTheme();
  darkQuery.addEventListener('change', applyTheme);

  // --- Header Elevation & Scroll-To-Top via IntersectionObserver ---
  const topSentinel = document.getElementById('topSentinel');
  const siteHeader = document.getElementById('siteHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (topSentinel && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isAtTop = entry.isIntersecting;
          if (siteHeader) {
            siteHeader.classList.toggle('scrolled', !isAtTop);
          }
          if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('show', !isAtTop);
          }
        });
      },
      { threshold: 0 }
    );
    headerObserver.observe(topSentinel);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // --- Active Navigation Link Highlighting via IntersectionObserver ---
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              const isActive = href === `#${id}`;
              link.classList.toggle('active', isActive);
              if (isActive) {
                link.setAttribute('aria-current', 'true');
              } else {
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  }

  // --- Mobile Navigation Menu Handler ---
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav && siteNav.classList.contains('open')) {
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  if (siteNav) {
    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Animated Telemetry Number Counters ---
  const telemetryBlock = document.querySelector('.hero-telemetry');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const pad = parseInt(el.dataset.pad || '0', 10);
    const duration = 850;
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

  if (telemetryBlock && 'IntersectionObserver' in window) {
    if (prefersReducedMotion) {
      telemetryBlock.querySelectorAll('[data-count]').forEach((el) => {
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const pad = parseInt(el.dataset.pad || '0', 10);
        el.textContent = decimals > 0
          ? parseFloat(el.dataset.count).toFixed(decimals)
          : String(Math.round(parseFloat(el.dataset.count))).padStart(pad, '0');
      });
    } else {
      const counterObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              telemetryBlock.querySelectorAll('[data-count]').forEach(animateCount);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      counterObserver.observe(telemetryBlock);
    }
  }

  // --- Toast Notification Primitive ---
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
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-message">${message}</span>
    `;

    while (toastContainer.children.length >= 3) {
      toastContainer.firstElementChild.remove();
    }
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const dismiss = () => {
      toast.classList.remove('show');
      window.setTimeout(() => toast.remove(), 300);
    };
    window.setTimeout(dismiss, 3800);
  };

  // --- Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(SITE_EMAIL);
        showToast('Email address copied to clipboard', 'success');
        const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
        if (tooltip) tooltip.textContent = 'Copied!';
        setTimeout(() => {
          if (tooltip) tooltip.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        showToast(`Email: ${SITE_EMAIL}`, 'success');
      }
    });
  }

  // --- Local Time Display (IST) ---
  const localTime = document.getElementById('localTime');
  if (localTime) {
    try {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Kolkata'
      });
      const tickClock = () => { localTime.textContent = fmt.format(new Date()); };
      tickClock();
      window.setInterval(tickClock, 30000);
    } catch (e) {
      localTime.textContent = '';
    }
  }

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnLabel = document.getElementById('submitBtnLabel');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').trim();
      const email = (formData.get('email') || '').trim();
      const message = (formData.get('message') || '').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.style.color = 'var(--error)';
          formStatus.textContent = 'All fields are required.';
        }
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (!emailRegex.test(email)) {
        if (formStatus) {
          formStatus.style.color = 'var(--error)';
          formStatus.textContent = 'Please provide a valid email.';
        }
        showToast('Please provide a valid email', 'error');
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

        if (!res.ok) throw new Error('Transmission failed');

        if (formStatus) {
          formStatus.style.color = 'var(--success)';
          formStatus.textContent = 'Message transmitted successfully.';
        }
        showToast('Message sent successfully. Thank you!', 'success');
        contactForm.reset();
      } catch (err) {
        if (formStatus) {
          formStatus.style.color = 'var(--error)';
          formStatus.textContent = 'Could not dispatch message. Please use direct email.';
        }
        showToast('Could not send message. Please email directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtnLabel) submitBtnLabel.textContent = 'Send Message';
        }
        window.setTimeout(() => {
          if (formStatus) formStatus.textContent = '';
        }, 5000);
      }
    });
  }

  // --- Dynamic Footer Year ---
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  // --- Global Keyboard Shortcuts & Command Palette (Ctrl/Cmd + K) ---
  const commands = [
    { title: 'Explore Projects', section: 'projects', shortcut: 'P' },
    { title: 'About Abhishek', section: 'about', shortcut: 'A' },
    { title: 'Technical Skills Matrix', section: 'skills', shortcut: 'S' },
    { title: 'Academic Credentials', section: 'education', shortcut: 'E' },
    { title: 'Contact & Inquiries', section: 'contact', shortcut: 'C' },
    { title: 'Launch 3D CRT Studio', url: '/studio.html', shortcut: '3D' },
    { title: 'Download Resume (PDF)', url: 'assets/Abhishek_Sati_Resume.pdf', shortcut: 'R' }
  ];

  let paletteBackdrop = null;
  let paletteInput = null;
  let paletteResults = null;
  let activeIndex = 0;

  const buildPalette = () => {
    paletteBackdrop = document.createElement('div');
    paletteBackdrop.className = 'command-palette-backdrop';
    paletteBackdrop.setAttribute('role', 'dialog');
    paletteBackdrop.setAttribute('aria-modal', 'true');
    paletteBackdrop.setAttribute('aria-label', 'Command Palette');

    paletteBackdrop.innerHTML = `
      <div class="command-palette-dialog">
        <div class="palette-input-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted)"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="palette-input" placeholder="Type a destination or command..." aria-label="Command search input" />
          <kbd>ESC</kbd>
        </div>
        <ul class="palette-results-list" role="listbox"></ul>
        <div class="palette-footer-hint">
          <span>Navigate with Arrow keys</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    `;

    document.body.appendChild(paletteBackdrop);
    paletteInput = paletteBackdrop.querySelector('.palette-input');
    paletteResults = paletteBackdrop.querySelector('.palette-results-list');

    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });

    paletteInput.addEventListener('input', () => {
      renderResults(paletteInput.value.trim().toLowerCase());
    });

    paletteInput.addEventListener('keydown', (e) => {
      const items = paletteResults.querySelectorAll('.palette-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActiveItem(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActiveItem(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[activeIndex]) items[activeIndex].click();
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });
  };

  const updateActiveItem = (items) => {
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === activeIndex);
    });
  };

  const renderResults = (query = '') => {
    if (!paletteResults) return;
    const filtered = commands.filter(c => c.title.toLowerCase().includes(query));
    paletteResults.innerHTML = '';
    activeIndex = 0;

    if (filtered.length === 0) {
      paletteResults.innerHTML = `<li style="padding:1rem;color:var(--text-muted);font-size:0.85rem;text-align:center;">No matching commands found.</li>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const li = document.createElement('li');
      li.className = `palette-item ${idx === 0 ? 'active' : ''}`;
      li.setAttribute('role', 'option');
      li.innerHTML = `
        <span>${cmd.title}</span>
        <kbd>${cmd.shortcut}</kbd>
      `;
      li.addEventListener('click', () => {
        closePalette();
        if (cmd.url) {
          window.open(cmd.url, cmd.url.startsWith('http') || cmd.url.endsWith('.pdf') ? '_blank' : '_self');
        } else if (cmd.section) {
          document.getElementById(cmd.section)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
      paletteResults.appendChild(li);
    });
  };

  const openPalette = () => {
    if (!paletteBackdrop) buildPalette();
    paletteBackdrop.style.display = 'flex';
    document.body.classList.add('no-scroll');
    renderResults();
    paletteInput.value = '';
    paletteInput.focus();
  };

  const closePalette = () => {
    if (paletteBackdrop) {
      paletteBackdrop.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  };

  const cmdTriggerBtn = document.getElementById('cmdTriggerBtn');
  if (cmdTriggerBtn) {
    cmdTriggerBtn.addEventListener('click', openPalette);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop && paletteBackdrop.style.display === 'flex') {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

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

  // --- In-Browser Web Crypto Sandbox Logic ---
  const cryptoInput = document.getElementById('cryptoInput');
  const cryptoEncryptBtn = document.getElementById('cryptoEncryptBtn');
  const sha256Result = document.getElementById('sha256Result');
  const aesResult = document.getElementById('aesResult');
  const copyShaBtn = document.getElementById('copyShaBtn');
  const copyAesBtn = document.getElementById('copyAesBtn');

  const bufToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const executeWebCrypto = async () => {
    if (!window.crypto || !window.crypto.subtle) {
      if (sha256Result) sha256Result.textContent = 'Web Crypto API not available in this environment';
      if (aesResult) aesResult.textContent = 'Web Crypto API not available in this environment';
      return;
    }

    const text = (cryptoInput ? cryptoInput.value : '').trim() || 'Zero-knowledge distributed systems';
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    try {
      // 1. SHA-256 Digest
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashHex = bufToHex(hashBuffer);
      if (sha256Result) sha256Result.textContent = hashHex;

      // 2. AES-GCM 256-bit Encryption with 96-bit random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        data
      );

      const ivHex = bufToHex(iv);
      const cipherHex = bufToHex(encryptedBuffer);
      if (aesResult) aesResult.textContent = `IV:${ivHex} | CIPHER:${cipherHex}`;
    } catch (err) {
      if (sha256Result) sha256Result.textContent = 'Error computing digest';
      if (aesResult) aesResult.textContent = 'Error computing AES-GCM';
    }
  };

  if (cryptoEncryptBtn) {
    cryptoEncryptBtn.addEventListener('click', executeWebCrypto);
  }
  if (cryptoInput) {
    cryptoInput.addEventListener('input', executeWebCrypto);
    executeWebCrypto();
  }

  const handleCopyCode = async (btn, targetId, label) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.textContent.trim());
      showToast(`${label} copied to clipboard`, 'success');
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    } catch (e) {
      showToast('Copy failed', 'error');
    }
  };

  if (copyShaBtn) {
    copyShaBtn.addEventListener('click', () => handleCopyCode(copyShaBtn, 'sha256Result', 'SHA-256 Digest'));
  }
  if (copyAesBtn) {
    copyAesBtn.addEventListener('click', () => handleCopyCode(copyAesBtn, 'aesResult', 'Ciphertext'));
  }

  // --- Subtle Cursor Spotlight on Cards ---
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.bento-card, .panel-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });
  }

  // --- Service Worker Registration for Offline PWA ---
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

});