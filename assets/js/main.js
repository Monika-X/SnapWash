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

  // Mobile Menu Toggle (Placeholder logic)
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Additional mobile menu styling would be added here
    });
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}
