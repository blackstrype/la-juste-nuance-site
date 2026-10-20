import { describe, it, expect } from 'vitest';
import config from '../../../astro.config.mjs';

const pageFiles = import.meta.glob('../../pages/*.astro');
const pageRoutes = Object.keys(pageFiles).map(
  (file) => '/' + file.split('/').pop().replace(/\.astro$/, '') + '/'
);

describe('legacy redirects', () => {
  const entries = Object.entries(config.redirects);

  it('defines the four legacy short URLs', () => {
    expect(entries.map(([from]) => from).sort()).toEqual([
      '/allure',
      '/essence',
      '/garde-robe',
      '/palette',
    ]);
  });

  it.each(entries)('%s targets a trailing-slash URL', (_from, to) => {
    expect(to.endsWith('/')).toBe(true);
  });

  it.each(entries)('%s targets an existing page route', (_from, to) => {
    expect(pageRoutes).toContain(to);
  });
});
