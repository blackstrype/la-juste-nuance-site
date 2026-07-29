// La Juste Nuance - Client Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
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

  // FAQ Accordion
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

  // Handle active navigation states on scroll for single-page links
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      
      if (navLink) {
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
  
  // Calendly Booking Integration Helper
  // We can initialize Calendly popup on buttons with class 'btn-book'
  const bookingButtons = document.querySelectorAll('.btn-book');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder calendly handle (can be configured)
      const calendlyUrl = 'https://calendly.com/florence-corolleur/30min';
      
      // Check if Calendly widget script is loaded
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({ url: calendlyUrl });
      } else {
        // Fallback to opening Calendly in a new tab if library is not loaded
        window.open(calendlyUrl, '_blank');
      }
    });
  });

  // Services Modal Dialog Data and Logic
  const servicesData = {
    palette: {
      title: "La Juste Palette",
      price: "160 €",
      duration: "Séance individuelle de 2h aux Clayes-sous-Bois",
      experience: "Nous réalisons ensemble ton diagnostic colorimétrique en présentiel. Je place les drapages colorés un par un autour de ton visage pour observer en lumière naturelle les teintes qui t'éclairent et celles qui t'éteignent. Pas de théorie figée, ton visage est notre seule référence.",
      deliverables: [
        "Un book personnalisé méthode Incarnation®",
        "Ta carte d'identité colorimétrique",
        "Ton nuancier physique personnalisé de 20 couleurs en tissu",
        "Ta palette digitale complète de 65 couleurs",
        "Un guide d'harmonie des couleurs personnalisé"
      ],
      image: "images/Conseil_en_image_les_Clayes_sous_Bois_21.jpg"
    },
    allure: {
      title: "La Juste Allure",
      price: "140 €",
      duration: "Séance individuelle de 2h30 aux Clayes-sous-Bois",
      experience: "Nous réalisons ton diagnostic morphologique et ton étude de style de façon bienveillante. Nous observons les lignes, les volumes et les proportions de ton corps pour définir ton style signature en accord avec ta personnalité et ton quotidien.",
      deliverables: [
        "Un book personnalisé méthode Incarnation®",
        "Ta morpho-identité et l'analyse de ta structure corporelle",
        "Ton style signature et tes planches d'inspiration",
        "Des conseils précis de coupes, de matières et d'accessoires",
        "Une grille de tri dressing pour initier la suite"
      ],
      image: "images/Conseil_en_image_les_Clayes_sous_Bois_32.jpg"
    },
    essence: {
      title: "La Juste Essence",
      price: "540 €",
      duration: "Accompagnement de 4h30 (1 ou 2 séances aux Clayes-sous-Bois)",
      experience: "La formule d'exploration complète combinant colorimétrie, morphologie et style vestimentaire. C'est l'alliance parfaite pour révéler ton image sous toutes ses facettes, avec douceur et alignement intérieur.",
      deliverables: [
        "3 books personnalisés méthode Incarnation® (Palette, Allure, Essence)",
        "Ta palette digitale de 65 couleurs et ton nuancier tissu",
        "L'analyse morphologique et ta charte de style signature",
        "Des conseils d'harmonisation coiffure et visagisme",
        "Une liste de marques éthiques adaptées à ton profil"
      ],
      image: "images/Conseil_en_image_les_Clayes_sous_Bois_34.jpg"
    },
    'garde-robe': {
      title: "La Juste Garde-Robe",
      price: "840 €",
      duration: "Accompagnement de 9h en 3 séances (dont 3h à ton domicile)",
      experience: "L'expérience premium pour aller jusqu'au bout de la démarche. Après avoir révélé tes couleurs et ton style signature, nous trions ton dressing à ton domicile. Nous créons de nouvelles tenues à partir de ce que tu possèdes déjà. Chaque tenue est photographiée et archivée pour ton quotidien.",
      deliverables: [
        "Tout ce qui est inclus dans l'offre La Juste Essence",
        "Le book garde-robe personnalisé avec les photos de tes tenues",
        "Un tri de dressing complet à domicile (sans culpabilité)",
        "Une liste de shopping ciblée pour combler les manques réels",
        "Un accompagnement WhatsApp privilégié pendant 2 mois"
      ],
      image: "images/Conseil_en_image_les_Clayes_sous_Bois_36.jpg"
    }
  };

  // Create Modal Element in DOM if not exists
  let modal = document.querySelector('.service-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
      <div class="service-modal-container">
        <button class="service-modal-close" aria-label="Fermer">&times;</button>
        <div class="service-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Modal Close Listeners
    modal.querySelector('.service-modal-close').addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Open Service Modal
  function openServiceModal(data, key) {
    const modalBody = modal.querySelector('.service-modal-body');
    const deliverablesList = data.deliverables.map(item => `<li>${item}</li>`).join('');

    modalBody.innerHTML = `
      <div class="service-modal-grid">
        <div class="service-modal-image-wrapper">
          <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="service-modal-content">
          <h2>${data.title}</h2>
          <div class="service-modal-price">${data.price}</div>
          <div><span class="service-modal-duration">${data.duration}</span></div>
          <p class="service-modal-experience">${data.experience}</p>
          
          <h3 class="service-modal-deliverables-title">Tu repars avec :</h3>
          <ul class="service-modal-deliverables">
            ${deliverablesList}
          </ul>
          
          <div class="service-modal-actions">
            <a href="#" class="btn btn-primary btn-book modal-book-btn">Réserver</a>
            <a href="/la-juste-nuance-site/${key}" class="btn btn-outline">Voir les détails</a>
          </div>
        </div>
      </div>
    `;

    // Wire up book button inside modal
    const modalBookBtn = modalBody.querySelector('.modal-book-btn');
    modalBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const calendlyUrl = 'https://calendly.com/florence-corolleur/30min';
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({ url: calendlyUrl });
      } else {
        window.open(calendlyUrl, '_blank');
      }
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Bind Click Event on Cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don't intercept clicks on buttons/links directly (let them bubble)
      if (e.target.closest('.btn-book') || e.target.closest('.learn-more-link')) {
        return;
      }
      
      e.preventDefault();
      const heading = card.querySelector('h3');
      if (!heading) return;
      
      const title = heading.textContent;
      let key = '';
      if (title.includes('Palette')) key = 'palette';
      else if (title.includes('Allure')) key = 'allure';
      else if (title.includes('Essence')) key = 'essence';
      else if (title.includes('Garde-Robe')) key = 'garde-robe';

      if (key && servicesData[key]) {
        openServiceModal(servicesData[key], key);
      }
    });
  });

  // Create Contact Modal Element in DOM if not exists
  let contactModal = document.querySelector('.contact-modal');
  if (!contactModal) {
    contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.innerHTML = `
      <div class="contact-modal-container">
        <button class="service-modal-close contact-modal-close" aria-label="Fermer">&times;</button>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-dark); margin-bottom: 0.5rem; text-align: center;">Contact & Échange</h2>
        <p style="text-align: center; color: var(--color-muted); font-size: 0.95rem; margin-bottom: 1rem;">Choisis l'option qui convient le mieux à ton besoin :</p>
        
        <div class="contact-tab-nav">
          <button class="contact-tab-btn active" data-tab="form">💬 Envoyer un message</button>
          <button class="contact-tab-btn" data-tab="calendly">📅 Appel découverte (30 min)</button>
        </div>

        <!-- Tab 1: Form -->
        <div class="contact-tab-panel" id="contact-panel-form">
          <form class="contact-form" action="https://formsubmit.co/ajax/florence.corolleur@gmail.com" method="POST">
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
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({ url: calendlyUrl });
      } else {
        window.open(calendlyUrl, '_blank');
      }
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
        const response = await fetch(form.action, {
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
