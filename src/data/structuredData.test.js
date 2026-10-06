import { describe, it, expect } from 'vitest';
import { buildBusiness, buildFaq, buildService, buildBreadcrumb, BUSINESS_ID } from './structuredData.js';

describe('structuredData', () => {
  it('builds a business without street address, phone, email or price', () => {
    const json = JSON.stringify(buildBusiness());
    expect(JSON.parse(json)['@type']).toBe('ProfessionalService');
    expect(json).not.toMatch(/streetAddress|telephone|email|priceRange/);
    expect(buildBusiness().address.addressLocality).toBe('Les Clayes-sous-Bois');
  });

  it('builds a FAQPage from question/answer pairs', () => {
    const faq = buildFaq([{ question: 'Q ?', answer: 'R.' }]);
    expect(faq.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Q ?',
      acceptedAnswer: { '@type': 'Answer', text: 'R.' },
    });
  });

  it('builds a Service that references the business', () => {
    const service = buildService({ name: 'X', description: 'Y', path: 'x-page' });
    expect(service.provider['@id']).toBe(BUSINESS_ID);
    expect(service.url).toBe('https://lajustenuance.fr/x-page');
  });

  it('builds a two-level BreadcrumbList', () => {
    const crumb = buildBreadcrumb({ name: 'X', path: 'x-page' });
    expect(crumb['@type']).toBe('BreadcrumbList');
    expect(crumb.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(crumb.itemListElement[0].item).toBe('https://lajustenuance.fr/');
    expect(crumb.itemListElement[1]).toMatchObject({ name: 'X', item: 'https://lajustenuance.fr/x-page' });
  });
});
