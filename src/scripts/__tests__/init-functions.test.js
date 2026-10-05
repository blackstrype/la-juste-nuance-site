import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  initMobileNav,
  initFaq,
  initScrollActive,
  initBookingButtons,
  initServiceCards,
} from '../main.js';

const CALENDLY_URL = 'https://calendly.com/florence-corolleur/30min';

describe('initMobileNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="burger"></div>
      <ul class="nav-links">
        <li><a href="about">À propos</a></li>
        <li><a href="contact">Contact</a></li>
      </ul>
    `;
    initMobileNav();
  });

  it('toggles the nav and burger classes on click', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.click();
    expect(nav.classList.contains('active')).toBe(true);
    expect(burger.classList.contains('toggle')).toBe(true);

    burger.click();
    expect(nav.classList.contains('active')).toBe(false);
    expect(burger.classList.contains('toggle')).toBe(false);
  });

  it('animates the links when opening and clears the animation when closing', () => {
    const burger = document.querySelector('.burger');
    const items = document.querySelectorAll('.nav-links li');

    burger.click();
    items.forEach(li => expect(li.style.animation).toContain('navLinkFade'));

    burger.click();
    items.forEach(li => expect(li.style.animation).toBe(''));
  });

  it('does nothing when the burger or nav is missing', () => {
    document.body.innerHTML = '<div class="burger"></div>';
    expect(() => initMobileNav()).not.toThrow();
  });
});

describe('initFaq', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="faq-item" id="item-1">
        <button class="faq-question">Question 1</button>
        <div class="faq-answer">Réponse 1</div>
      </div>
      <div class="faq-item" id="item-2">
        <button class="faq-question">Question 2</button>
        <div class="faq-answer">Réponse 2</div>
      </div>
    `;
    initFaq();
  });

  it('opens the clicked item', () => {
    const item = document.getElementById('item-1');
    item.querySelector('.faq-question').click();

    expect(item.classList.contains('active')).toBe(true);
    expect(item.querySelector('.faq-answer').style.maxHeight).not.toBe('');
  });

  it('closes the other items when another one is opened', () => {
    const first = document.getElementById('item-1');
    const second = document.getElementById('item-2');

    first.querySelector('.faq-question').click();
    second.querySelector('.faq-question').click();

    expect(first.classList.contains('active')).toBe(false);
    expect(first.querySelector('.faq-answer').style.maxHeight).toBe('');
    expect(second.classList.contains('active')).toBe(true);
  });

  it('closes an open item when clicked again', () => {
    const item = document.getElementById('item-1');
    const question = item.querySelector('.faq-question');

    question.click();
    question.click();

    expect(item.classList.contains('active')).toBe(false);
    expect(item.querySelector('.faq-answer').style.maxHeight).toBe('');
  });
});

describe('initScrollActive', () => {
  const setLayout = (el, top, height) => {
    Object.defineProperty(el, 'offsetTop', { value: top, configurable: true });
    Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true });
  };

  const scrollTo = (y) => {
    Object.defineProperty(window, 'pageYOffset', { value: y, configurable: true });
    window.dispatchEvent(new Event('scroll'));
  };

  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="nav-links">
        <li><a href="./#services" id="link-services">Services</a></li>
        <li><a href="./#faq" id="link-faq">FAQ</a></li>
      </ul>
      <section id="services"></section>
      <section id="faq"></section>
    `;
    setLayout(document.getElementById('services'), 500, 400);
    setLayout(document.getElementById('faq'), 900, 400);
    initScrollActive();
  });

  afterEach(() => {
    scrollTo(0);
  });

  it('marks the link of the section currently in view as active', () => {
    scrollTo(600);

    expect(document.getElementById('link-services').classList.contains('active')).toBe(true);
    expect(document.getElementById('link-faq').classList.contains('active')).toBe(false);
  });

  it('moves the active class when scrolling to the next section', () => {
    scrollTo(600);
    scrollTo(1100);

    expect(document.getElementById('link-services').classList.contains('active')).toBe(false);
    expect(document.getElementById('link-faq').classList.contains('active')).toBe(true);
  });

  it('leaves every link inactive above the first section', () => {
    scrollTo(0);

    expect(document.querySelectorAll('.nav-links a.active').length).toBe(0);
  });
});

describe('initBookingButtons', () => {
  beforeEach(() => {
    global.Calendly = undefined;
    vi.spyOn(window, 'open').mockImplementation(() => {});
    document.body.innerHTML = `
      <a href="#" class="btn-book" id="book-1">Réserver</a>
      <a href="#" class="btn-book" id="book-2">Réserver</a>
    `;
    initBookingButtons();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('opens the Calendly page when a booking button is clicked', () => {
    document.getElementById('book-1').click();

    expect(window.open).toHaveBeenCalledWith(CALENDLY_URL, '_blank');
  });

  it('uses the Calendly popup widget when it is available', () => {
    global.Calendly = { initPopupWidget: vi.fn() };

    document.getElementById('book-2').click();

    expect(global.Calendly.initPopupWidget).toHaveBeenCalledWith({ url: CALENDLY_URL });
    expect(window.open).not.toHaveBeenCalled();
  });

  it('prevents the default link navigation', () => {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    document.getElementById('book-1').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});

describe('initServiceCards', () => {
  beforeEach(() => {
    global.Calendly = undefined;
    vi.spyOn(window, 'open').mockImplementation(() => {});
    document.body.innerHTML = `
      <div class="service-card" id="card">
        <h3 id="card-title">Colorimétrie</h3>
        <a href="#colorimetrie" class="learn-more-link">En savoir plus</a>
        <a href="#" class="btn-book">Réserver</a>
      </div>
      <div class="service-card" id="card-no-link"><p>Sans lien</p></div>
    `;
    initServiceCards();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gives the cards a pointer cursor', () => {
    document.querySelectorAll('.service-card').forEach(card => {
      expect(card.style.cursor).toBe('pointer');
    });
  });

  it('clicks the learn-more link when the card body is clicked', () => {
    const link = document.querySelector('.learn-more-link');
    const linkClick = vi.fn(e => e.preventDefault());
    link.addEventListener('click', linkClick);

    document.getElementById('card-title').click();

    expect(linkClick).toHaveBeenCalledTimes(1);
  });

  it('does not intercept clicks on the learn-more link itself', () => {
    const link = document.querySelector('.learn-more-link');
    const linkClick = vi.fn(e => e.preventDefault());
    link.addEventListener('click', linkClick);

    link.click();

    // Only the native click, no extra programmatic one from the card handler
    expect(linkClick).toHaveBeenCalledTimes(1);
  });

  it('does not intercept clicks on the booking button', () => {
    const link = document.querySelector('.learn-more-link');
    const linkClick = vi.fn(e => e.preventDefault());
    link.addEventListener('click', linkClick);

    document.querySelector('.btn-book').click();

    expect(linkClick).not.toHaveBeenCalled();
  });

  it('does not throw when a card has no learn-more link', () => {
    expect(() => document.getElementById('card-no-link').click()).not.toThrow();
  });
});
