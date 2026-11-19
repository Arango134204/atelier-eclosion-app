import type { Product, ProductType } from '../types/product';

import type { ShopifyProduct } from './shopify.types';

const mapProductType = (raw: string, handle: string, title: string): ProductType => {
  const haystack = `${raw} ${handle} ${title}`.toLowerCase();
  if (haystack.includes('bracelet') || haystack.includes('pulsera')) return 'bracelet';
  return 'earrings';
};

/** Adapta un producto Shopify al modelo interno `Product` usado por la UI. */
export function mapShopifyProduct(raw: ShopifyProduct): Product {
  const variant = raw.variants[0];
  const price = variant ? Number.parseFloat(variant.price) : Number.NaN;

  return {
    id: String(raw.id),
    handle: raw.handle,
    name: raw.title.replace(/^Boucles d['’]oreille\s+/i, '').trim() || raw.title,
    type: mapProductType(raw.product_type, raw.handle, raw.title),
    price: Number.isFinite(price) ? price : 0,
    currency: 'EUR',
    imageUrl: raw.images[0]?.src ?? null,
  };
}

export function mapShopifyProducts(raw: ShopifyProduct[]): Product[] {
  return raw.map(mapShopifyProduct).filter((product) => product.price > 0);
}
