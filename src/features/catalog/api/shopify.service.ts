import { http } from '@/services/api/http';

import { mapShopifyProduct, mapShopifyProducts } from './shopify.mapper';
import type { ShopifyProductResponse, ShopifyProductsResponse } from './shopify.types';
import type { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await http.get<ShopifyProductsResponse>('/products.json');
  return mapShopifyProducts(data.products);
}

export async function fetchProductByHandle(handle: string): Promise<Product> {
  const { data } = await http.get<ShopifyProductResponse>(`/products/${handle}.json`);
  return mapShopifyProduct(data.product);
}
