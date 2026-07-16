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
      const calendlyUrl = 'https://calendly.com/la-just-nuance';
      
      // Check if Calendly widget script is loaded
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({ url: calendlyUrl });
      } else {
        // Fallback to opening Calendly in a new tab if library is not loaded
        window.open(calendlyUrl, '_blank');
      }
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
