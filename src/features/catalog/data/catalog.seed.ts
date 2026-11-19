import type { Product } from '../types/product';

/**
 * Respaldo local de las piezas publicadas en ateliereclosionbijoux.com.
 * El catálogo en pantalla usa Shopify vía Axios + TanStack Query; esta semilla solo
 * resuelve favoritos/borradores si la caché remota aún no tiene el handle.
 */
const CDN = 'https://cdn.shopify.com/s/files/1/1050/4195/3032/files';

export const catalogSeed: Product[] = [
  { id: '12312761565448', handle: 'bracelet-solena', name: 'Solena', type: 'bracelet', price: 30, currency: 'EUR', imageUrl: `${CDN}/Braceletsolenarouge.jpg` },
  { id: '12269300744456', handle: 'boucles-doreille-dorada', name: 'Dorada', type: 'earrings', price: 60, currency: 'EUR', imageUrl: `${CDN}/image00003_1.jpg` },
  { id: '12269140771080', handle: 'boucles-doreille-solana', name: 'Solana', type: 'earrings', price: 40, currency: 'EUR', imageUrl: `${CDN}/boucles_d_oreille_artisanales_fait_main.jpg` },
  { id: '12135484424456', handle: 'amapola', name: 'Amapola', type: 'earrings', price: 55, currency: 'EUR', imageUrl: `${CDN}/image00003.jpg` },
  { id: '12120224563464', handle: 'boucles-doreille-dalia', name: 'Dalia', type: 'earrings', price: 35, currency: 'EUR', imageUrl: `${CDN}/Bpucles_d_oreille_dahlia_fait_main.jpg` },
  { id: '12134444105992', handle: 'peonia', name: 'Peonia', type: 'earrings', price: 45, currency: 'EUR', imageUrl: `${CDN}/Designsanstitre_2.jpg` },
  { id: '12119924769032', handle: 'boucles-doreille-buganvilla', name: 'Buganvilla', type: 'earrings', price: 45, currency: 'EUR', imageUrl: `${CDN}/Boucles_d_oreille_faits_main.jpg` },
  { id: '12117609447688', handle: 'boucles-doreille-amanecer', name: 'Amanecer', type: 'earrings', price: 44, currency: 'EUR', imageUrl: `${CDN}/bc8c58f1-f61f-4b5b-9e74-8e19025c172a.jpg` },
  { id: '12117605646600', handle: 'boucles-doreille-candela', name: 'Candela', type: 'earrings', price: 45, currency: 'EUR', imageUrl: `${CDN}/34675837-7ce6-421a-a32e-51fd8bb8c35f.jpg` },
];

export function findProductByHandle(handle: string): Product | undefined {
  return catalogSeed.find((product) => product.handle === handle);
}
