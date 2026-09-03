function initMain() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header?.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.accordion-item.active');
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('active');
        currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
      }
      
      item.classList.toggle('active');
      const content = item.querySelector('.accordion-content');
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // Mobile Menu — premium side drawer with overlay, icon swap + concierge block
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  const closeMobileMenu = () => {
    if (navLinks?.classList.contains('active')) setMenuState(false);
  };

  const setMenuState = (isOpen) => {
    navLinks.classList.toggle('active', isOpen);
    document.querySelector('.navbar')?.classList.toggle('scrolled', isOpen);
    mobileBtn?.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileBtn?.querySelector('i');
    if (icon) icon.className = isOpen ? 'ri-close-line' : 'ri-menu-3-line';
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (isOpen && !overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      overlay.addEventListener('click', closeMobileMenu);
      document.body.appendChild(overlay);
    }
    if (overlay) overlay.classList.toggle('show', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (mobileBtn && navLinks) {
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.addEventListener('click', () => {
      setMenuState(!navLinks.classList.contains('active'));
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMobileMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    if (!navLinks.querySelector('.nav-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'nav-close-btn';
      closeBtn.innerHTML = '<i class="ri-close-line"></i>';
      closeBtn.setAttribute('aria-label', 'Close Menu');
      closeBtn.addEventListener('click', closeMobileMenu);
      navLinks.insertBefore(closeBtn, navLinks.firstChild);
    }

    if (!navLinks.querySelector('.mobile-menu-extra')) {
      const extra = document.createElement('div');
      extra.className = 'mobile-menu-extra';
      extra.innerHTML =
        '<div class="mme-label">Concierge</div>' +
        '<a class="mme-link" href="tel:+442071234567"><i class="ri-phone-line"></i>+44 20 7123 4567</a>' +
        '<a class="mme-link" href="mailto:concierge@snapwash.com"><i class="ri-mail-line"></i>concierge@snapwash.com</a>' +
        '<div class="mme-socials">' +
        '<a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>' +
        '<a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>' +
        '<a href="#" aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>' +
        '<a href="#" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>' +
        '</div>';
      navLinks.appendChild(extra);
    }
  }

  // Form Success Messages (no page refresh)
  const showFormSuccess = (form, message) => {
    let success = form.parentElement.querySelector('.form-success');
    if (!success) {
      success = document.createElement('div');
      success.className = 'form-success';
      success.innerHTML = '<i class="ri-checkbox-circle-line"></i><span></span>';
      form.after(success);
    }
    success.querySelector('span').textContent = message;
    success.style.display = 'flex';
  };

  // Newsletter forms — show success + clear only the input
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const value = input?.value.trim();
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        input?.focus();
        return;
      }
      input.value = '';
      showFormSuccess(form, "You're on The Private List. Welcome!");
    });
  });

  // Contact form — show success + reset only the inputs
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = contactForm.querySelectorAll('input, textarea');
    let valid = true;
    required.forEach(field => {
      if (field.hasAttribute('required') && !field.value.trim()) valid = false;
    });
    if (!valid) return;
    contactForm.reset();
    showFormSuccess(contactForm, 'Message sent! Our team will respond within 24 hours.');
  });

  // Schedule pickup form — show success + reset only the inputs
  const scheduleForm = document.getElementById('schedule-form');
  scheduleForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    scheduleForm.reset();
    showFormSuccess(scheduleForm, 'Pickup scheduled! Our concierge will confirm shortly.');
  });

  // Profile dropdown menu
  const profileMenus = document.querySelectorAll('.profile-menu');
  profileMenus.forEach(menu => {
    const btn = menu.querySelector('.profile-icon');
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wasOpen = menu.classList.contains('open');
      document.querySelectorAll('.profile-menu.open').forEach(m => m.classList.remove('open'));
      if (!wasOpen) menu.classList.add('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-menu') || e.target.closest('.profile-menu a')) {
      document.querySelectorAll('.profile-menu.open').forEach(m => m.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.profile-menu.open').forEach(m => m.classList.remove('open'));
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
