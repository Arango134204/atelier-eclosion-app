import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SavedRequest } from '@/features/request/types';

type NewRequest = Omit<SavedRequest, 'id' | 'number' | 'createdAt' | 'status'>;

/**
 * TEMPORAL (hito 2): las solicitudes se guardan solo en este teléfono.
 * En el hito 4 se envían a Firestore para que la artesana las reciba.
 */
interface RequestsState {
  requests: SavedRequest[];
  add: (request: NewRequest) => SavedRequest;
}

const formatNumber = (sequence: number) => `ÉC-${String(sequence).padStart(4, '0')}`;

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set, get) => ({
      requests: [],
      add: (request) => {
        const saved: SavedRequest = {
          ...request,
          id: `${Date.now()}`,
          number: formatNumber(get().requests.length + 1),
          createdAt: new Date().toISOString(),
          status: 'saved',
        };
        set((state) => ({ requests: [saved, ...state.requests] }));
        return saved;
      },
    }),
    {
      name: 'eclosion-requests',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
