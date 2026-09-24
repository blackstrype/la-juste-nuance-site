import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openCalendly } from '../main.js';

describe('openCalendly', () => {
  const url = 'https://calendly.com/test';

  beforeEach(() => {
    // Reset globals before each test
    global.Calendly = undefined;
    vi.spyOn(window, 'open').mockImplementation(() => {});
  });

  it('initializes Calendly popup if global Calendly object is defined', () => {
    // Setup
    global.Calendly = {
      initPopupWidget: vi.fn()
    };

    // Act
    openCalendly(url);

    // Assert
    expect(global.Calendly.initPopupWidget).toHaveBeenCalledWith({ url });
    expect(window.open).not.toHaveBeenCalled();
  });

  it('opens new window if global Calendly object is not defined', () => {
    // Act
    openCalendly(url);

    // Assert
    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});
