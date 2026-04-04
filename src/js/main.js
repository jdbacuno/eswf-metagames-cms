export function initNavLinks() {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Check if it's an internal link (starts with #)
      if (href.startsWith('#')) {
        e.preventDefault(); // Stop the "snap" jump

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Get navbar height to avoid covering the section title
          const navHeight = navbar.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          // Smooth scroll to the offset position
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // UI: Handle active states
        document
          .querySelectorAll('.nav-links a')
          .forEach((l) => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

export function initNavInteractions() {
  const navbar = document.getElementById('navbar');
  const menuOpenBtn = document.getElementById('menuOpenBtn');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener(
    'scroll',
    () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    },
    { passive: true },
  );

  function triggerLinkAnimations() {
    const delays = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45];
    navLinks.querySelectorAll('li').forEach((li, i) => {
      li.style.animation = 'none';
      li.offsetHeight; // force reflow
      li.style.animation = `linkSlideIn 0.3s ease ${delays[i] || 0}s both`;
    });
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    const icon = menuOpenBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');

    // Reset animations on close
    navLinks.querySelectorAll('li').forEach((li) => {
      li.style.animation = 'none';
    });
  }

  // Wire the X button inside the drawer to close the menu
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  menuOpenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      navLinks.classList.add('open');
      const icon = menuOpenBtn.querySelector('i');
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
      triggerLinkAnimations(); // only runs when button is clicked
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isOpen = navLinks.classList.contains('open');
    const clickedInsideMenu = navLinks.contains(e.target);
    const clickedOpenBtn = menuOpenBtn.contains(e.target);

    if (isOpen && !clickedInsideMenu && !clickedOpenBtn) {
      closeMenu();
    }
  });
};

/* ── Scroll reveal for WAM section ── */
export function initWAMInteractions() {
  const revealEls = document.querySelectorAll('.wam-inner, .pillars');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ── Scroll reveal for News & Updates section ── */
export function initNewsUpdateInteractions() {
  const newsEls = document.querySelectorAll('.news-header, .news-containter img');

  const newsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          newsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  newsEls.forEach((el) => newsObserver.observe(el));
}

/* ── Sports & Games Carousel ── */
export function initSportsGamesInteractions() {
  const track = document.querySelector('.sports-carousel__track');
  const slides = document.querySelectorAll('.sports-slide');
  const dots = document.querySelectorAll('.sports-dot');
  const btnPrev = document.querySelector('.sports-carousel__btn--prev');
  const btnNext = document.querySelector('.sports-carousel__btn--next');

  if (!track || !slides.length) return;

  let current = 0;
  let autoTimer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    dots[current]?.setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    dots[current]?.setAttribute('aria-selected', 'true');

    track.style.transform = `translateX(-${current * 100}%)`;
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  btnNext?.addEventListener('click', () => {
    goTo(current + 1);
    resetAuto();
  });
  btnPrev?.addEventListener('click', () => {
    goTo(current - 1);
    resetAuto();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetAuto();
    });
  });

  // Swipe support
  let touchStartX = 0;
  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  });

  startAuto();
}