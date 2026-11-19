import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SavedRequest } from '@/features/request/types';

type NewRequest = Omit<SavedRequest, 'id' | 'number' | 'createdAt' | 'status'>;

/**
 * Solicitudes visibles en el teléfono.
 * Siempre se guardan en AsyncStorage; si Firestore responde, el estado pasa a `sent`.
 */
interface RequestsState {
  requests: SavedRequest[];
  add: (request: NewRequest, status?: SavedRequest['status']) => SavedRequest;
  markSent: (id: string) => void;
}

const formatNumber = (sequence: number) => `ÉC-${String(sequence).padStart(4, '0')}`;

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set, get) => ({
      requests: [],
      add: (request, status = 'saved') => {
        const saved: SavedRequest = {
          ...request,
          id: `${Date.now()}`,
          number: formatNumber(get().requests.length + 1),
          createdAt: new Date().toISOString(),
          status,
        };
        set((state) => ({ requests: [saved, ...state.requests] }));
        return saved;
      },
      markSent: (id) =>
        set((state) => ({
          requests: state.requests.map((item) => (item.id === id ? { ...item, status: 'sent' } : item)),
        })),
    }),
    {
      name: 'eclosion-requests',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
