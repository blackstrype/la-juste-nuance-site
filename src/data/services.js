// The four offers, shared by the related-services block and the breadcrumbs.
export const SERVICES = [
  {
    path: 'colorimetrie-conseil-en-image',
    name: 'La Juste Palette',
    anchor: 'Découvrir La Juste Palette, colorimétrie et palette de couleurs personnalisée',
  },
  {
    path: 'morphologie-conseil-en-image',
    name: 'La Juste Allure',
    anchor: 'Découvrir La Juste Allure, accompagnement morphologie et silhouette',
  },
  {
    path: 'style-conseil-en-image',
    name: 'La Juste Essence',
    anchor: 'Découvrir La Juste Essence, accompagnement style et image de soi',
  },
  {
    path: 'tri-de-dressing-conseil-en-image',
    name: 'La Juste Garde-Robe',
    anchor: 'Découvrir La Juste Garde-Robe, tri de dressing à domicile',
  },
];

export const relatedServices = (currentPath) => SERVICES.filter((s) => s.path !== currentPath);
