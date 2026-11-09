import type { QuoteBreakdown } from '@/features/quote/calculateQuote';
import type { ShippingZone } from '@/features/quote/quote.rules';

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type RequestStatus = 'saved' | 'sent' | 'inReview' | 'confirmed';

export interface SavedRequest {
  id: string;
  /** Número visible para la clienta, p. ej. "ÉC-0001". */
  number: string;
  createdAt: string;
  productHandle: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  surMesure: boolean;
  customLengthCm: number | null;
  shippingZone: ShippingZone;
  quote: QuoteBreakdown;
  contact: ContactDetails;
  status: RequestStatus;
}
