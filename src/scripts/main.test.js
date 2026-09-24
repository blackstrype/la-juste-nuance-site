import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { initContactModal } from './main.js';

describe('openContactModal', () => {
  beforeAll(() => {
    // Setup a complete DOM environment required by the modal helper
    document.body.innerHTML = `
      <div class="contact-modal">
        <div class="contact-tab-nav">
          <button class="contact-tab-btn active" data-tab="form">Message</button>
          <button class="contact-tab-btn" data-tab="calendly">Appel</button>
        </div>
        <div class="contact-tab-panel" id="contact-panel-form">
          <form class="contact-form"></form>
          <div class="form-success-message" style="display: none;"></div>
        </div>
        <div class="contact-tab-panel" id="contact-panel-calendly" style="display: none;">
        </div>
      </div>
      <button class="btn-contact"></button>
    `;

    // Execute script logic inside the vitest environment
    initContactModal();
  });

  beforeEach(() => {
    // Reset modal state
    const contactModal = document.querySelector('.contact-modal');
    if (contactModal) {
      contactModal.classList.remove('active');
    }
    document.body.style.overflow = '';
  });

  it('should define window.openContactModal', () => {
    expect(typeof window.openContactModal).toBe('function');
  });

  it('should open form tab by default', () => {
    window.openContactModal();

    const contactModal = document.querySelector('.contact-modal');
    expect(contactModal).not.toBeNull();
    expect(contactModal.classList.contains('active')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    const panelForm = document.querySelector('#contact-panel-form');
    const panelCalendly = document.querySelector('#contact-panel-calendly');

    expect(panelForm.style.display).toBe('block');
    expect(panelCalendly.style.display).toBe('none');

    const formTabBtn = document.querySelector('.contact-tab-btn[data-tab="form"]');
    const calendlyTabBtn = document.querySelector('.contact-tab-btn[data-tab="calendly"]');

    expect(formTabBtn.classList.contains('active')).toBe(true);
    expect(calendlyTabBtn.classList.contains('active')).toBe(false);
  });

  it('should open calendly tab if specified', () => {
    window.openContactModal('calendly');

    const contactModal = document.querySelector('.contact-modal');
    expect(contactModal.classList.contains('active')).toBe(true);

    const panelForm = document.querySelector('#contact-panel-form');
    const panelCalendly = document.querySelector('#contact-panel-calendly');

    expect(panelForm.style.display).toBe('none');
    expect(panelCalendly.style.display).toBe('block');

    const formTabBtn = document.querySelector('.contact-tab-btn[data-tab="form"]');
    const calendlyTabBtn = document.querySelector('.contact-tab-btn[data-tab="calendly"]');

    expect(formTabBtn.classList.contains('active')).toBe(false);
    expect(calendlyTabBtn.classList.contains('active')).toBe(true);
  });

  it('should reset form view state and hide success message', () => {
    const form = document.querySelector('.contact-form');
    const successMsg = document.querySelector('.form-success-message');

    form.style.display = 'none';
    successMsg.style.display = 'block';

    window.openContactModal();

    expect(form.style.display).toBe('block');
    expect(successMsg.style.display).toBe('none');
  });
});
