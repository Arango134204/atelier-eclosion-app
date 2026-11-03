/** Idioma principal de la marca. Define la forma que deben cumplir las demás traducciones. */
export const fr = {
  brand: {
    tagline: 'Tissés à la main, perle après perle',
  },
  nav: {
    home: 'Accueil',
    atelier: "L'atelier",
    about: 'La maison',
    catalog: 'Créations',
    favorites: 'Favoris',
    requests: 'Mes demandes',
  },
  catalog: {
    eyebrow: 'Les créations',
    title: 'Tissés à la main, perle après perle',
    intro: 'Des pièces artisanales inspirées de la Colombie, créées en petites séries dans notre atelier de Mulhouse.',
  },
  productType: {
    earrings: "Boucles d'oreille",
    bracelet: 'Bracelet',
  },
  product: {
    notFoundTitle: 'Introuvable',
    notFoundHeading: "Cette pièce n'existe pas",
    notFoundBody: 'Elle est peut-être épuisée, ou le lien est incorrect.',
    backToCatalog: 'Retour aux créations',
  },
  favorites: {
    emptyTitle: "Vous n'avez pas encore de favoris",
    emptyBody: 'Enregistrez les pièces qui vous plaisent pour les retrouver plus tard.',
    explore: 'Découvrir les créations',
  },
  requests: {
    emptyTitle: 'Aucune demande pour le moment',
    emptyBody: 'Retrouvez ici vos commandes et demandes sur mesure, avec leur statut.',
  },
  atelier: {
    title: 'Atelier à Mulhouse',
    body: "La carte de l'atelier et votre position arriveront ici (OpenStreetMap + Leaflet, étape 3).",
  },
  about: {
    eyebrow: 'Atelier Éclosion Bijoux',
    title: 'Révéler la lumière de celle qui la porte',
    body: "Des créations artisanales inspirées de la Colombie, où couleurs, savoir-faire et féminité se rencontrent. Chaque pièce est imaginée et tissée à la main, perle après perle, dans l'atelier de Mulhouse.",
    signature: 'Tissés à la main · Inspirés de la Colombie',
    series: 'Créés en petites séries',
  },
  notFound: {
    title: 'Page introuvable',
    heading: "Cette page n'existe pas",
    goHome: "Retour à l'accueil",
  },
  language: {
    label: 'Langue',
    fr: 'Français',
    es: 'Español',
  },
};

export type Translation = typeof fr;
