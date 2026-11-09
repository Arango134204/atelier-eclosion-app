import { create } from 'zustand';

import { QUANTITY_MAX, QUANTITY_MIN, type ShippingZone } from '@/features/quote/quote.rules';

/**
 * Solicitud en construcción, compartida por Détail → Devis → Coordonnées.
 * No se persiste: si la app se cierra a mitad del flujo, la clienta vuelve a empezar desde el detalle.
 */
interface RequestDraftState {
  productHandle: string | null;
  quantity: number;
  surMesure: boolean;
  customLength: string;
  shippingZone: ShippingZone;
  start: (productHandle: string, quantity: number) => void;
  setQuantity: (quantity: number) => void;
  setSurMesure: (surMesure: boolean) => void;
  setCustomLength: (customLength: string) => void;
  setShippingZone: (zone: ShippingZone) => void;
  reset: () => void;
}

const initialState = {
  productHandle: null,
  quantity: QUANTITY_MIN,
  surMesure: false,
  customLength: '',
  shippingZone: 'france' as ShippingZone,
};

const clampQuantity = (value: number) => Math.min(QUANTITY_MAX, Math.max(QUANTITY_MIN, Math.round(value)));

export const useRequestDraftStore = create<RequestDraftState>()((set) => ({
  ...initialState,
  start: (productHandle, quantity) => set({ ...initialState, productHandle, quantity: clampQuantity(quantity) }),
  setQuantity: (quantity) => set({ quantity: clampQuantity(quantity) }),
  setSurMesure: (surMesure) => set({ surMesure }),
  setCustomLength: (customLength) => set({ customLength }),
  setShippingZone: (shippingZone) => set({ shippingZone }),
  reset: () => set(initialState),
}));
