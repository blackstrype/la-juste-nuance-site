// Schema.org JSON-LD builders. Deliberately no street address, phone, email or price.
const SITE_URL = 'https://lajustenuance.fr/';
export const BUSINESS_ID = `${SITE_URL}#business`;

export const AREA_SERVED = [
  'Les Clayes-sous-Bois', 'Villepreux', 'Plaisir', 'Elancourt', 'Maurepas', 'Coignières',
  'La Verrière', 'Trappes', 'Montigny-le-Bretonneux', 'Guyancourt', 'Voisins-le-Bretonneux',
  'Magny-les-Hameaux', "Bois-d'Arcy", 'Chavenay', 'Rennemoulin', 'Saint-Nom-la-Bretèche',
  'Noisy-le-Roi', "Saint-Cyr-l'École", 'Feucherolles', 'Bailly', 'Crespières', 'Versailles',
  'Le Chesnay-Rocquencourt', 'Saint-Germain-en-Laye', 'Mareil-sur-Mauldre', 'Jouy-en-Josas',
];

const areaServed = () => AREA_SERVED.map((name) => ({ '@type': 'City', name }));

export function buildBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: 'La Juste Nuance',
    description: "Conseil en image et estime de soi pour les femmes : colorimétrie, morphologie, style et tri de dressing.",
    url: SITE_URL,
    image: `${SITE_URL}images/Conseil_en_image_les_Clayes_sous_Bois_banner.png`,
    logo: `${SITE_URL}images/Conseil_en_image_les_Clayes_sous_Bois_logo.png`,
    sameAs: [
      'https://www.instagram.com/la_juste_nuance',
      'https://www.facebook.com/profile.php?id=61590238631048',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Les Clayes-sous-Bois',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    areaServed: areaServed(),
  };
}

export function buildFaq(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function buildService({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, SITE_URL).href,
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed(),
  };
}

// Breadcrumb trail: Accueil > current page.
export function buildBreadcrumb({ name, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: new URL(path, SITE_URL).href },
    ],
  };
}
