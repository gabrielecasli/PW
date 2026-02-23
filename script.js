/* =============================================
   INITIALIZE AOS (Animate On Scroll)
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });

  initNavbar();
  initMobileMenu();
  initActiveNavTracking();
  initProjectExpanders();
});

/* =============================================
   NAVBAR — scroll effect
   ============================================= */
function initNavbar() {
  var navbar = document.getElementById('navbar');
  var scrollThreshold = 50;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* =============================================
   MOBILE MENU — toggle
   ============================================= */
function initMobileMenu() {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var links = menu.querySelectorAll('.navbar__link');

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('navbar__toggle--active');
    menu.classList.toggle('navbar__menu--open');
  });

  // Close menu when a link is clicked
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('navbar__toggle--active');
      menu.classList.remove('navbar__menu--open');
    });
  });
}

/* =============================================
   ACTIVE NAV LINK — highlight on scroll
   ============================================= */
function initActiveNavTracking() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar__link');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('navbar__link--active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('navbar__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
}

/* =============================================
   PROJECT CARDS — expandable detail sections
   ============================================= */
function initProjectExpanders() {
  var cards = document.querySelectorAll('.project-card[data-project]');

  cards.forEach(function (card) {
    var toggleBtn = card.querySelector('.project-card__toggle');
    var detail = card.querySelector('.project-detail');

    if (!toggleBtn || !detail) return;

    // Click on the toggle button
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleProject(card, toggleBtn, detail);
    });

    // Click anywhere on the card (except links/tags) also toggles
    card.addEventListener('click', function (e) {
      // Don't toggle if clicking on a tag, link, or the button itself
      if (e.target.closest('.project-card__tags') || e.target.closest('.project-card__toggle')) {
        return;
      }
      toggleProject(card, toggleBtn, detail);
    });
  });
}

function toggleProject(card, toggleBtn, detail) {
  var isOpen = detail.classList.contains('project-detail--open');

  if (isOpen) {
    // Close
    detail.style.maxHeight = detail.scrollHeight + 'px';
    // Force reflow so the browser registers the explicit value
    detail.offsetHeight;
    detail.style.maxHeight = '0';
    detail.classList.remove('project-detail--open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.firstChild.textContent = 'Read more ';
    card.style.transform = '';
  } else {
    // Close any other open card first
    closeAllProjects();

    // Open this one
    detail.classList.add('project-detail--open');
    detail.style.maxHeight = detail.scrollHeight + 'px';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.firstChild.textContent = 'Read less ';
    card.style.transform = 'translateY(0)';
  }
}

function closeAllProjects() {
  var allCards = document.querySelectorAll('.project-card[data-project]');

  allCards.forEach(function (card) {
    var detail = card.querySelector('.project-detail');
    var toggleBtn = card.querySelector('.project-card__toggle');
    if (detail && detail.classList.contains('project-detail--open')) {
      detail.style.maxHeight = '0';
      detail.classList.remove('project-detail--open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.firstChild.textContent = 'Read more ';
      }
      card.style.transform = '';
    }
  });
}
