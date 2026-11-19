import axios from 'axios';

/**
 * Cliente HTTP centralizado. Toda petición a Shopify pasa por aquí
 * para que baseURL, timeouts y cabeceras vivan en un solo sitio.
 */
export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SHOPIFY_BASE_URL ?? 'https://ateliereclosionbijoux.com',
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
});
