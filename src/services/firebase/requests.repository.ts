import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import type { SavedRequest } from '@/features/request/types';

import { getDb, isFirebaseConfigured } from './app';

export type PersistOutcome = 'sent' | 'savedLocal';

/**
 * Intenta guardar la solicitud en Firestore (compartida con la artesana).
 * Si Firebase no está configurado o falla la red, el llamador debe conservar la copia local.
 */
export async function persistRequestRemote(request: SavedRequest): Promise<PersistOutcome> {
  if (!isFirebaseConfigured()) return 'savedLocal';

  const db = getDb();
  if (!db) return 'savedLocal';

  await addDoc(collection(db, 'requests'), {
    localId: request.id,
    number: request.number,
    createdAt: request.createdAt,
    serverCreatedAt: serverTimestamp(),
    productHandle: request.productHandle,
    productName: request.productName,
    productImageUrl: request.productImageUrl,
    quantity: request.quantity,
    surMesure: request.surMesure,
    customLengthCm: request.customLengthCm,
    shippingZone: request.shippingZone,
    quote: request.quote,
    contact: request.contact,
    status: 'sent',
  });

  return 'sent';
}
