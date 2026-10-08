/**
 * Royal Wedding Main Application Controller
 */

(function () {
  'use strict';

  function getWeddingConfig() {
    if (typeof window !== 'undefined' && window.WEDDING_CONFIG) {
      return window.WEDDING_CONFIG;
    }
    if (typeof WEDDING_CONFIG !== 'undefined') {
      return WEDDING_CONFIG;
    }
    return null;
  }

  function startApp() {
    initParticles();
    hydrateContent();
    initInvitationOverlay();
    initCountdown();
    initNavigation();
    initScrollAnimations();
    initGallery();
    initRSVP();
    initWishesWall();
    initFAQ();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }

  /* ==========================================================
     1. Particles Initialization
     ========================================================== */
  function initParticles() {
    if (window.RoyalParticles) {
      window.RoyalParticles.init('royal-particles-canvas');
    }
  }

  /* ==========================================================
     2. Content Hydration from WEDDING_CONFIG
     ========================================================== */
  function hydrateContent() {
    const config = getWeddingConfig();
    if (!config) return;

    // Couple Details
    document.querySelectorAll('.couple-groom-name').forEach(el => el.textContent = config.couple.groom.name);
    document.querySelectorAll('.couple-bride-name').forEach(el => el.textContent = config.couple.bride.name);
    document.querySelectorAll('.couple-monogram').forEach(el => el.textContent = config.couple.monogram);
    document.querySelectorAll('.wedding-hashtag').forEach(el => el.textContent = config.couple.hashtag);
    document.querySelectorAll('.wedding-date-str').forEach(el => el.textContent = config.dateFormatted);
    document.querySelectorAll('.wedding-time-str').forEach(el => el.textContent = config.auspiciousTime);

    // Shloka
    const shlokaSanskrit = document.getElementById('shloka-sanskrit');
    const shlokaMeaning = document.getElementById('shloka-meaning');
    if (shlokaSanskrit && config.shloka) shlokaSanskrit.textContent = config.shloka.sanskrit;
    if (shlokaMeaning && config.shloka) shlokaMeaning.textContent = `"${config.shloka.translation}"`;

    // Groom & Bride Bios and Socials
    const groomBio = document.getElementById('groom-bio');
    const brideBio = document.getElementById('bride-bio');
    const groomInsta = document.getElementById('groom-instagram');
    const brideInsta = document.getElementById('bride-instagram');

    if (groomBio) groomBio.textContent = config.couple.groom.bio;
    if (brideBio) brideBio.textContent = config.couple.bride.bio;

    if (groomInsta && config.couple.groom.instagramUrl) {
      groomInsta.href = config.couple.groom.instagramUrl;
      groomInsta.textContent = `Instagram ${config.couple.groom.instagram}`;
    }
    if (brideInsta && config.couple.bride.instagramUrl) {
      brideInsta.href = config.couple.bride.instagramUrl;
      brideInsta.textContent = `Instagram ${config.couple.bride.instagram}`;
    }

    // Story Timeline
    const timelineContainer = document.getElementById('story-timeline-container');
    if (timelineContainer && config.storyMilestones) {
      timelineContainer.innerHTML = config.storyMilestones.map((m, idx) => `
        <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'} reveal-on-scroll">
          <div class="timeline-dot">
            <span class="timeline-icon">${m.icon}</span>
          </div>
          <div class="timeline-card luxury-glass">
            <span class="timeline-year">${m.year}</span>
            <h3 class="timeline-title">${m.title}</h3>
            <h4 class="timeline-subtitle">${m.subtitle}</h4>
            <p class="timeline-desc">${m.description}</p>
          </div>
        </div>
      `).join('');
    }

    // Events Itinerary
    const eventsContainer = document.getElementById('events-grid-container');
    if (eventsContainer && config.events) {
      eventsContainer.innerHTML = config.events.map(ev => `
        <article class="event-card luxury-glass reveal-on-scroll" id="event-${ev.id}">
          <div class="event-image-wrapper">
            <img src="${ev.image}" alt="${ev.title}" class="event-img" loading="lazy" />
            ${ev.dayNumber ? `<div class="event-day-badge">${ev.dayNumber}</div>` : ''}
            <div class="event-badge">${ev.dressCode}</div>
          </div>
          <div class="event-body">
            <span class="event-tagline">${ev.tagline}</span>
            <h3 class="event-title">${ev.title}</h3>
            <div class="event-meta">
              <div class="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${ev.date}</span>
              </div>
              <div class="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${ev.time}</span>
              </div>
              <div class="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span><strong>${ev.venueName}</strong>, ${ev.location}</span>
              </div>
            </div>
            <p class="event-desc">${ev.description}</p>
            <div class="event-actions">
              <a href="${buildGoogleCalendarLink(ev)}" target="_blank" rel="noopener noreferrer" class="btn-royal-outline btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Add to Calendar
              </a>
              <a href="${ev.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-royal-solid btn-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                Get Directions
              </a>
            </div>
          </div>
        </article>
      `).join('');
    }

    // Travel Guide
    const travelContainer = document.getElementById('travel-grid-container');
    if (travelContainer && config.travelGuide) {
      travelContainer.innerHTML = config.travelGuide.map(t => `
        <div class="travel-card luxury-glass reveal-on-scroll">
          <div class="travel-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <h3 class="travel-title">${t.title}</h3>
          <p class="travel-desc">${t.desc}</p>
        </div>
      `).join('');
    }

    // FAQs
    const faqContainer = document.getElementById('faq-accordion-container');
    if (faqContainer && config.faqs) {
      faqContainer.innerHTML = config.faqs.map((f, i) => `
        <div class="faq-item luxury-glass ${i === 0 ? 'active' : ''}">
          <button class="faq-header" aria-expanded="${i === 0}">
            <span class="faq-question">${f.q}</span>
            <span class="faq-chevron"></span>
          </button>
          <div class="faq-content">
            <p>${f.a}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /* Helper to format Google Calendar URL */
  function buildGoogleCalendarLink(ev) {
    const title = encodeURIComponent(`Wedding: ${ev.title} (Gokul & Anandhi)`);
    const details = encodeURIComponent(`${ev.description}\nDress Code: ${ev.dressCode}\nVenue: ${ev.venueName}`);
    const location = encodeURIComponent(`${ev.venueName}, ${ev.location}`);
    // Example dates in UTC/local approximation
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }

  /* ==========================================================
     3. Royal Invitation Wax Seal & Envelope Entrance
     ========================================================== */
  function initInvitationOverlay() {
    const overlay = document.getElementById('royal-invitation-overlay');
    const sealBtn = document.getElementById('wax-seal-btn');
    const openBtn = document.getElementById('open-invitation-btn');

    if (!overlay) return;

    function openInvitation(e) {
      if (overlay.classList.contains('opened')) return;

      // Burst of golden sparkles at click point or center
      const rect = (sealBtn || overlay).getBoundingClientRect();
      const x = e && e.clientX ? e.clientX : rect.left + rect.width / 2;
      const y = e && e.clientY ? e.clientY : rect.top + rect.height / 2;

      if (window.RoyalParticles) {
        window.RoyalParticles.burst(x, y, 70);
      }

      overlay.classList.add('opened');

      // Start music automatically if enabled
      if (window.RoyalAudio && window.WEDDING_CONFIG && window.WEDDING_CONFIG.audio.autoPlayOnEnter) {
        setTimeout(() => {
          window.RoyalAudio.play();
        }, 500);
      }

      // Smooth removal after animations finish
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }, 1600);
    }

    if (sealBtn) sealBtn.addEventListener('click', openInvitation);
    if (openBtn) openBtn.addEventListener('click', openInvitation);
  }

  /* ==========================================================
     4. Auspicious Live Countdown
     ========================================================== */
  function initCountdown() {
    const config = getWeddingConfig();
    if (!config) return;

    function parseDate(str) {
      if (!str) return null;
      if (typeof str === 'number') return str;
      const parts = String(str).match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
      if (parts) {
        return new Date(
          parseInt(parts[1], 10),
          parseInt(parts[2], 10) - 1,
          parseInt(parts[3], 10),
          parseInt(parts[4] || '0', 10),
          parseInt(parts[5] || '0', 10),
          parseInt(parts[6] || '0', 10)
        ).getTime();
      }
      return new Date(str).getTime();
    }

    const targetDate = parseDate(config.weddingDate);
    if (!targetDate) return;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function update() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        const banner = document.getElementById('countdown-message');
        if (banner) banner.textContent = "The Celebrations Have Begun! Let Love Light The Way.";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      if (daysEl && daysEl.textContent !== dStr) daysEl.textContent = dStr;
      if (hoursEl && hoursEl.textContent !== hStr) hoursEl.textContent = hStr;
      if (minutesEl && minutesEl.textContent !== mStr) minutesEl.textContent = mStr;

      if (secondsEl && secondsEl.textContent !== sStr) {
        secondsEl.textContent = sStr;
        secondsEl.classList.remove('tick-pulse');
        void secondsEl.offsetWidth;
        secondsEl.classList.add('tick-pulse');
      }
    }

    update();
    if (window.__weddingCountdownInterval) clearInterval(window.__weddingCountdownInterval);
    window.__weddingCountdownInterval = setInterval(update, 1000);
  }

  /* ==========================================================
     5. Luxury Navigation & Active Spy
     ========================================================== */
  function initNavigation() {
    const navbar = document.getElementById('main-nav');
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Sticky transparent to solid transition on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    });

    // Mobile menu toggle
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        toggleBtn.classList.toggle('active', isOpen);
        toggleBtn.setAttribute('aria-expanded', isOpen);
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('nav-open');
          toggleBtn.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
        if (link) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  /* ==========================================================
     6. Scroll Reveal Observer
     ========================================================== */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /* ==========================================================
     7. Photo Gallery & Lightbox
     ========================================================== */
  function initGallery() {
    const config = getWeddingConfig();
    if (!config || !config.gallery) return;

    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('gallery-lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    let currentItems = [...config.gallery];
    let currentIndex = 0;

    function renderGallery(filter = 'all') {
      if (!galleryGrid) return;
      currentItems = filter === 'all'
        ? config.gallery
        : config.gallery.filter(item => item.category === filter);

      galleryGrid.innerHTML = currentItems.map((item, index) => `
        <div class="gallery-item luxury-glass reveal-on-scroll" data-index="${index}">
          <div class="gallery-img-wrapper">
            <img src="${item.url}" alt="${item.title}" class="gallery-img" loading="lazy" />
            <div class="gallery-overlay">
              <span class="gallery-icon">🔍</span>
              <h4 class="gallery-hover-title">${item.title}</h4>
              <p class="gallery-hover-caption">${item.caption}</p>
            </div>
          </div>
        </div>
      `).join('');

      // Add click listeners to items
      galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.index, 10);
          openLightbox(idx);
        });
      });

      // Observe new items
      galleryGrid.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('in-view');
      });
    }

    function openLightbox(index) {
      if (!lightbox || !currentItems[index]) return;
      currentIndex = index;
      const item = currentItems[currentIndex];
      lbImg.src = item.url;
      lbTitle.textContent = item.title;
      lbCaption.textContent = item.caption;
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
      openLightbox(currentIndex);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % currentItems.length;
      openLightbox(currentIndex);
    }

    // Filter clicks
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', showPrev);
    if (lbNext) lbNext.addEventListener('click', showNext);

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    renderGallery('all');
  }

  /* ==========================================================
     8. RSVP Submission with Confetti & Royal Pass Modal
     ========================================================== */
  function initRSVP() {
    const form = document.getElementById('wedding-rsvp-form');
    const modal = document.getElementById('rsvp-success-modal');
    const modalClose = document.getElementById('rsvp-modal-close');
    const guestPassName = document.getElementById('pass-guest-name');
    const guestPassCount = document.getElementById('pass-guest-count');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const guestName = formData.get('guest_name');
      const guestEmail = formData.get('guest_email');
      const attending = formData.get('attendance');
      const guestCount = formData.get('guest_count') || '1';
      const foodPref = formData.get('dietary') || 'Traditional Sadya Feast';
      const eventsAttending = formData.getAll('events_attending');
      const songRequest = formData.get('song_request') || '';
      const notes = formData.get('guest_notes') || '';

      const rsvpData = {
        name: guestName,
        email: guestEmail,
        attending: attending,
        guestCount: guestCount,
        foodPref: foodPref,
        events: eventsAttending,
        songRequest: songRequest,
        notes: notes,
        submittedAt: new Date().toISOString()
      };

      // Store in localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('royal_wedding_rsvps') || '[]');
        saved.push(rsvpData);
        localStorage.setItem('royal_wedding_rsvps', JSON.stringify(saved));
      } catch (err) {
        console.error('Storage error:', err);
      }

      // Confetti burst
      triggerConfetti();

      // Update Modal
      if (guestPassName) guestPassName.textContent = guestName;
      if (guestPassCount) guestPassCount.textContent = `${guestCount} Guest(s)`;

      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  function triggerConfetti() {
    // If particles engine exists, burst gold particles
    if (window.RoyalParticles) {
      window.RoyalParticles.burst(window.innerWidth / 2, window.innerHeight / 2, 80);
      window.RoyalParticles.burst(window.innerWidth / 4, window.innerHeight / 3, 50);
      window.RoyalParticles.burst((3 * window.innerWidth) / 4, window.innerHeight / 3, 50);
    }
  }

  /* ==========================================================
     9. Digital Wishes Wall & Floating Hearts
     ========================================================== */
  function initWishesWall() {
    const list = document.getElementById('wishes-feed');
    const form = document.getElementById('wish-submission-form');
    if (!list) return;

    const STORAGE_KEY = 'gokul_anandhi_blessings_v1';

    // Clear any previous demo wishes stored in localStorage
    try {
      localStorage.removeItem('royal_wedding_wishes');
      localStorage.removeItem('royal_wedding_rsvps');
    } catch (e) {}

    function loadWishes() {
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) {}

      // Filter out any legacy dummy demo messages if any
      stored = stored.filter(w => 
        w && w.name && 
        !w.name.includes("Ramesh") && 
        !w.name.includes("Pooja") && 
        !w.name.includes("Arjun")
      );

      if (stored.length === 0) {
        list.innerHTML = `
          <div class="wish-empty-state" style="text-align: center; padding: 2.5rem 1rem; color: var(--ivory-400);">
            <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">🪔</div>
            <p style="font-size: 0.95rem; font-style: italic;">Be the first to shower Gokul & Anandhi with your sacred blessings below!</p>
          </div>
        `;
        return;
      }

      list.innerHTML = stored.map(w => `
        <div class="wish-card luxury-glass">
          <div class="wish-header">
            <span class="wish-author">${w.name}</span>
            <span class="wish-time">${w.time || 'Recently'}</span>
          </div>
          <p class="wish-text">"${w.message}"</p>
        </div>
      `).join('');
    }

    loadWishes();

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('wish-name-input');
        const textInput = document.getElementById('wish-message-input');

        if (!nameInput.value.trim() || !textInput.value.trim()) return;

        const newWish = {
          name: nameInput.value.trim(),
          message: textInput.value.trim(),
          time: "Just now"
        };

        try {
          const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          stored.unshift(newWish);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch (e) {}

        loadWishes();
        launchFloatingHearts();
        if (window.RoyalParticles) {
          window.RoyalParticles.burst(window.innerWidth / 2, window.innerHeight * 0.7, 60);
        }

        form.reset();
      });
    }
  }

  function launchFloatingHearts() {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '💛';
      heart.style.left = `${Math.random() * 80 + 10}vw`;
      heart.style.bottom = '10vh';
      heart.style.animationDelay = `${Math.random() * 0.4}s`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2500);
    }
  }

  /* ==========================================================
     10. FAQ Accordion
     ========================================================== */
  function initFAQ() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const header = e.target.closest('.faq-header');
      if (!header) return;

      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  }

})();
