import type { ProductType } from '@/features/catalog/types/product';

import {
  CUSTOM_LENGTH_RANGE,
  FREE_SHIPPING_THRESHOLD,
  QUANTITY_MAX,
  QUANTITY_MIN,
  SHIPPING_COST,
  SUR_MESURE_RATE,
  type ShippingZone,
} from './quote.rules';

export interface QuoteInput {
  unitPrice: number;
  quantity: number;
  productType: ProductType;
  surMesure: boolean;
  /** Texto tal como lo escribe la clienta; se valida aquí. */
  customLength: string;
  shippingZone: ShippingZone;
}

export interface QuoteBreakdown {
  subtotal: number;
  surMesureFee: number;
  shipping: number;
  total: number;
  /** Cuánto falta para el envío gratis (0 si ya se alcanzó). */
  remainingForFreeShipping: number;
}

export type QuoteError =
  | { field: 'quantity'; code: 'outOfRange'; min: number; max: number }
  | { field: 'unitPrice'; code: 'invalid' }
  | { field: 'customLength'; code: 'required' }
  | { field: 'customLength'; code: 'notNumeric' }
  | { field: 'customLength'; code: 'outOfRange'; min: number; max: number };

export type QuoteResult = { ok: true; value: QuoteBreakdown } | { ok: false; errors: QuoteError[] };

const roundCents = (value: number) => Math.round(value * 100) / 100;

/** Acepta "7", "7.5" o "7,5" (coma decimal en francés y español). */
export function parseDecimal(raw: string): number | null {
  const normalized = raw.trim().replace(',', '.');
  if (normalized === '' || !/^\d+(\.\d+)?$/.test(normalized)) return null;
  return Number(normalized);
}

export function validateQuoteInput(input: QuoteInput): QuoteError[] {
  const errors: QuoteError[] = [];

  if (!Number.isFinite(input.unitPrice) || input.unitPrice <= 0) {
    errors.push({ field: 'unitPrice', code: 'invalid' });
  }

  if (!Number.isInteger(input.quantity) || input.quantity < QUANTITY_MIN || input.quantity > QUANTITY_MAX) {
    errors.push({ field: 'quantity', code: 'outOfRange', min: QUANTITY_MIN, max: QUANTITY_MAX });
  }

  if (input.surMesure) {
    const range = CUSTOM_LENGTH_RANGE[input.productType];
    if (input.customLength.trim() === '') {
      errors.push({ field: 'customLength', code: 'required' });
    } else {
      const length = parseDecimal(input.customLength);
      if (length === null) {
        errors.push({ field: 'customLength', code: 'notNumeric' });
      } else if (length < range.min || length > range.max) {
        errors.push({ field: 'customLength', code: 'outOfRange', ...range });
      }
    }
  }

  return errors;
}

/**
 * Total = subtotal + recargo sur mesure + envío.
 * - subtotal = precio unitario × cantidad
 * - recargo = 15 % del subtotal si es sur mesure
 * - envío según zona, gratis si subtotal + recargo ≥ 120 €
 */
export function computeBreakdown(input: Omit<QuoteInput, 'customLength' | 'productType'>): QuoteBreakdown {
  const subtotal = roundCents(input.unitPrice * input.quantity);
  const surMesureFee = input.surMesure ? roundCents(subtotal * SUR_MESURE_RATE) : 0;
  const merchandise = subtotal + surMesureFee;
  const qualifiesForFreeShipping = merchandise >= FREE_SHIPPING_THRESHOLD;
  const shipping = qualifiesForFreeShipping ? 0 : SHIPPING_COST[input.shippingZone];

  return {
    subtotal,
    surMesureFee,
    shipping,
    total: roundCents(merchandise + shipping),
    remainingForFreeShipping: qualifiesForFreeShipping ? 0 : roundCents(FREE_SHIPPING_THRESHOLD - merchandise),
  };
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const errors = validateQuoteInput(input);
  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: computeBreakdown(input) };
}
