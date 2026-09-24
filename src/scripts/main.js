// La Juste Nuance - Client Interactivity

// Calendly Helper Function
export const openCalendly = function(calendlyUrl) {
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({ url: calendlyUrl });
  } else {
    window.open(calendlyUrl, '_blank');
  }
};

export const initMobileNav = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      // Toggle Nav
      nav.classList.toggle('active');
      
      // Burger Animation
      burger.classList.toggle('toggle');
      
      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
  }
};

export const initFaq = () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
};

export const initScrollActive = () => {
  const sections = document.querySelectorAll('section[id]');
  
  // Cache navigation links to avoid querying DOM on every scroll
  const sectionLinks = Array.from(sections).map(section => {
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
    return { section, navLink };
  });

  function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sectionLinks.forEach(({ section, navLink }) => {
      if (navLink) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120; // offset header

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }
  
  if (sections.length > 0) {
    window.addEventListener('scroll', scrollActive);
  }
};

export const initBookingButtons = () => {
  const bookingButtons = document.querySelectorAll('.btn-book');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder calendly handle (can be configured)
      const calendlyUrl = 'https://calendly.com/florence-corolleur/30min';
      
      openCalendly(calendlyUrl);
    });
  });
};

export const initServiceCards = () => {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don't intercept clicks on buttons/links directly (let them bubble)
      if (e.target.closest('.btn-book') || e.target.closest('.learn-more-link')) {
        return;
      }
      
      e.preventDefault();
      const learnMoreLink = card.querySelector('.learn-more-link');
      if (learnMoreLink) {
        learnMoreLink.click();
      }
    });
  });
};

export const initContactModal = () => {
  let contactModal = document.querySelector('.contact-modal');
  if (!contactModal) {
    contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.innerHTML = `
      <div class="contact-modal-container">
        <button class="contact-modal-close" aria-label="Fermer">&times;</button>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-dark); margin-bottom: 0.5rem; text-align: center;">Contact & Échange</h2>
        <p style="text-align: center; color: var(--color-muted); font-size: 0.95rem; margin-bottom: 1rem;">Choisis l'option qui convient le mieux à ton besoin :</p>
        
        <div class="contact-tab-nav">
          <button class="contact-tab-btn active" data-tab="form">💬 Envoyer un message</button>
          <button class="contact-tab-btn" data-tab="calendly">📅 Appel découverte (30 min)</button>
        </div>

        <!-- Tab 1: Form -->
        <div class="contact-tab-panel" id="contact-panel-form">
          <form class="contact-form" method="POST">
            <input type="hidden" name="_subject" value="Nouveau message depuis La Juste Nuance">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">

            <div class="contact-form-group">
              <label for="contact-name">Ton Prénom & Nom *</label>
              <input type="text" id="contact-name" name="name" required placeholder="ex. Sarah Dupont" class="form-input">
            </div>

            <div class="contact-form-group">
              <label for="contact-email">Ton adresse e-mail *</label>
              <input type="email" id="contact-email" name="email" required placeholder="ex. sarah@example.com" class="form-input">
            </div>

            <div class="contact-form-group">
              <label for="contact-message">Ta demande ou ton message *</label>
              <textarea id="contact-message" name="message" rows="4" required placeholder="Bonjour Florence, j'aimerais en savoir plus sur..." class="form-input"></textarea>
            </div>

            <button type="submit" class="btn btn-peach btn-submit-message" style="width: 100%; margin-top: 0.5rem; text-align: center; justify-content: center;">Envoyer mon message</button>
          </form>
          <div class="form-success-message" style="display: none;">
            ✨ <strong>Merci pour ton message !</strong><br>
            Il a bien été transmis à Florence, qui te répondra très rapidement sous 24h-48h.
          </div>
        </div>

        <!-- Tab 2: Calendly -->
        <div class="contact-tab-panel" id="contact-panel-calendly" style="display: none; text-align: center; padding: 1.5rem 0;">
          <p style="font-size: 1.05rem; line-height: 1.6; color: var(--color-dark); margin-bottom: 1.8rem;">
            Tu préfères réserver directement un créneau pour échanger de vive voix lors d'un <strong>appel découverte offert de 30 minutes</strong> ?
          </p>
          <button class="btn btn-primary btn-open-calendly-from-modal" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;">
            📅 Ouvrir l'agenda Calendly
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(contactModal);

    // Modal Close Listeners
    const closeBtn = contactModal.querySelector('.contact-modal-close');
    closeBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Tab Switching
    const tabBtns = contactModal.querySelectorAll('.contact-tab-btn');
    const panelForm = contactModal.querySelector('#contact-panel-form');
    const panelCalendly = contactModal.querySelector('#contact-panel-calendly');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'form') {
          panelForm.style.display = 'block';
          panelCalendly.style.display = 'none';
        } else {
          panelForm.style.display = 'none';
          panelCalendly.style.display = 'block';
        }
      });
    });

    // Calendly button inside modal
    const calendlyBtn = contactModal.querySelector('.btn-open-calendly-from-modal');
    calendlyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
      const calendlyUrl = 'https://calendly.com/florence-corolleur/30min';
      openCalendly(calendlyUrl);
    });

    // Form Submit Handler
    const form = contactModal.querySelector('.contact-form');
    const successMsg = contactModal.querySelector('.form-success-message');
    const submitBtn = contactModal.querySelector('.btn-submit-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      try {
        const formData = new FormData(form);
        const targetUrl = 'https://formsubmit.co/ajax/' + atob('ZmxvcmVuY2UuY29yb2xsZXVyQGdtYWlsLmNvbQ==');
        const response = await fetch(targetUrl, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          successMsg.style.display = 'block';
        } else {
          // Fallback user feedback
          form.reset();
          form.style.display = 'none';
          successMsg.style.display = 'block';
        }
      } catch (err) {
        form.reset();
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer mon message';
      }
    });
  }

  // Helper to open Contact Modal
  window.openContactModal = function(defaultTab = 'form') {
    if (!contactModal) return;
    const tabBtns = contactModal.querySelectorAll('.contact-tab-btn');
    const panelForm = contactModal.querySelector('#contact-panel-form');
    const panelCalendly = contactModal.querySelector('#contact-panel-calendly');
    const form = contactModal.querySelector('.contact-form');
    const successMsg = contactModal.querySelector('.form-success-message');

    // Reset form view state
    form.style.display = 'block';
    successMsg.style.display = 'none';

    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === defaultTab) b.classList.add('active');
      else b.classList.remove('active');
    });

    if (defaultTab === 'form') {
      panelForm.style.display = 'block';
      panelCalendly.style.display = 'none';
    } else {
      panelForm.style.display = 'none';
      panelCalendly.style.display = 'block';
    }

    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Bind all .btn-contact elements to open Contact Modal
  const contactButtons = document.querySelectorAll('.btn-contact');
  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal('form');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaq();
  initScrollActive();
  initBookingButtons();
  initServiceCards();
  initContactModal();
});

// Add Keyframe animation for mobile menu fade-in dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(styleSheet);
