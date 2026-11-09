import { useMemo } from 'react';

import { findProductByHandle } from '@/features/catalog/data/catalog.seed';
import type { Product } from '@/features/catalog/types/product';
import { useRequestDraftStore } from '@/store/requestDraft.store';

import { computeBreakdown, validateQuoteInput, type QuoteBreakdown, type QuoteError } from './calculateQuote';

interface UseQuoteResult {
  product: Product | undefined;
  /** Desglose en vivo; se muestra aunque falte completar el largo sur mesure. */
  breakdown: QuoteBreakdown | null;
  errors: QuoteError[];
  isValid: boolean;
  errorFor: (field: QuoteError['field']) => QuoteError | undefined;
}

/**
 * Cotización en vivo de la solicitud en curso.
 *
 * - Entradas: el borrador del store (pieza, cantidad, sur mesure, largo, zona de envío).
 * - Estado: no guarda estado propio; deriva todo del store para que Devis y Coordonnées vean el mismo total.
 * - Efectos: ninguno; recalcula con `useMemo` solo cuando cambia una entrada.
 * - Resultado: la pieza, el desglose, los errores de validación y si se puede continuar.
 */
export function useQuote(): UseQuoteResult {
  const productHandle = useRequestDraftStore((state) => state.productHandle);
  const quantity = useRequestDraftStore((state) => state.quantity);
  const surMesure = useRequestDraftStore((state) => state.surMesure);
  const customLength = useRequestDraftStore((state) => state.customLength);
  const shippingZone = useRequestDraftStore((state) => state.shippingZone);
  const product = productHandle ? findProductByHandle(productHandle) : undefined;

  const { breakdown, errors } = useMemo(() => {
    if (!product) return { breakdown: null, errors: [] };
    const input = { unitPrice: product.price, quantity, productType: product.type, surMesure, customLength, shippingZone };
    return { breakdown: computeBreakdown(input), errors: validateQuoteInput(input) };
  }, [product, quantity, surMesure, customLength, shippingZone]);

  return {
    product,
    breakdown,
    errors,
    isValid: product !== undefined && errors.length === 0,
    errorFor: (field) => errors.find((error) => error.field === field),
  };
}
