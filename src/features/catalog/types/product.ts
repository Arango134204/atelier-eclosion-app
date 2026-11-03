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

export type ProductType = 'earrings' | 'bracelet';

export const productTypeLabel: Record<ProductType, string> = {
  earrings: "Boucles d'oreille",
  bracelet: 'Bracelet',
};
