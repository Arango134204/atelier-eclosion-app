import type { ProductType } from '@/features/catalog/types/product';

/**
 * Reglas de negocio de la cotización (borrador acordado en docs/01-definicion-alcance.md).
 * Centralizadas aquí para poder ajustarlas tras validar con la clienta sin tocar las pantallas.
 */
export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 5;

/** Recargo por personalización sur mesure sobre el subtotal. */
export const SUR_MESURE_RATE = 0.15;

export type ShippingZone = 'france' | 'eu' | 'international';

export const SHIPPING_COST: Record<ShippingZone, number> = {
  france: 5,
  eu: 9,
  international: 15,
};

export const FREE_SHIPPING_THRESHOLD = 120;

/** Largo personalizado permitido, en centímetros, según el tipo de pieza. */
export const CUSTOM_LENGTH_RANGE: Record<ProductType, { min: number; max: number }> = {
  earrings: { min: 3, max: 12 },
  bracelet: { min: 14, max: 22 },
};
