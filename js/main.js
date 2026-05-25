/* ============================================================
   AGIT — main.js
   1. Mobile nav toggle
   2. Testimonial slider
   ============================================================ */

/* ── 0. Footer year ────────────────────────────────────────── */
(function () {
  var el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}());

/* ── 1. Mobile Nav ─────────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (!navbar || !hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navbar.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Cierra el menú al hacer click fuera
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Cierra el menú al seleccionar un link
  navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navbar.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}());

/* ── 2. Services Slider (páginas de servicio) ──────────────── */
(function () {
  var track = document.getElementById('servTrack');
  var prevBtn = document.getElementById('servPrevBtn');
  var nextBtn = document.getElementById('servNextBtn');

  if (!track || !prevBtn || !nextBtn) return;

  var cards = track.querySelectorAll('.email-servicio-card');
  if (cards.length === 0) return;

  var currentIndex = 0;
  var gap = 24;

  function getVisibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function updateSlider() {
    var visible = getVisibleCount();
    var viewportWidth = track.parentElement.offsetWidth;
    var cardWidth = (viewportWidth - gap * (visible - 1)) / visible;

    cards.forEach(function (card) {
      card.style.minWidth = cardWidth + 'px';
      card.style.width = cardWidth + 'px';
    });

    var offset = currentIndex * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
    prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex() ? '0.4' : '1';
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) { currentIndex--; updateSlider(); }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < maxIndex()) { currentIndex++; updateSlider(); }
  });

  [prevBtn, nextBtn].forEach(function (btn) {
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < maxIndex()) currentIndex++;
      else if (diff < 0 && currentIndex > 0) currentIndex--;
      updateSlider();
    }
  }, { passive: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      updateSlider();
    }, 100);
  });

  updateSlider();
}());

/* ── 3. Testimonial Slider ─────────────────────────────────── */
(function () {
  const track = document.getElementById('testimoniosTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.testimonio-card');
  if (cards.length === 0) return;

  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth <= 640 ? 1 : 2;
  }

  function maxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const cardWidth = track.parentElement.offsetWidth;
    const gap = 24; // 1.5rem en px
    const slideWidth = (cardWidth - gap * (visibleCount - 1)) / visibleCount;

    // Actualizar ancho de cards
    cards.forEach(function (card) {
      card.style.minWidth = slideWidth + 'px';
    });

    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex();
    prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex() ? '0.4' : '1';
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < maxIndex()) {
      currentIndex++;
      updateSlider();
    }
  });

  // Soporte de teclado
  [prevBtn, nextBtn].forEach(function (btn) {
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Swipe táctil
  var touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < maxIndex()) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateSlider();
    }
  }, { passive: true });

  // Recalcular al cambiar tamaño
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (currentIndex > maxIndex()) currentIndex = maxIndex();
      updateSlider();
    }, 100);
  });

  updateSlider();
}());
