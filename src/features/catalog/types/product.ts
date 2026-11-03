/** Modelo interno de la app. En el hito 3 el mapper de Shopify producirá este mismo tipo. */
export interface Product {
  id: string;
  handle: string;
  name: string;
  type: ProductType;
  price: number;
  currency: 'EUR';
  imageUrl: string | null;
}

/** La etiqueta visible está en las traducciones: `productType.<tipo>`. */
export type ProductType = 'earrings' | 'bracelet';
