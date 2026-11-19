/** Forma cruda que responde la API pública de Shopify Storefront (products.json). */
export interface ShopifyImage {
  src: string;
  width?: number;
  height?: number;
}

export interface ShopifyVariant {
  id: number;
  title: string;
  price: string;
  available: boolean;
  inventory_quantity?: number | null;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  product_type: string;
  vendor?: string;
  tags?: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
}

export interface ShopifyProductsResponse {
  products: ShopifyProduct[];
}

export interface ShopifyProductResponse {
  product: ShopifyProduct;
}
