import { useQuery } from '@tanstack/react-query';

import { fetchProductByHandle } from '../api/shopify.service';

export const productQueryKey = (handle: string) => ['product', handle] as const;

/**
 * Detalle de una pieza por `handle`.
 *
 * - Entradas: el handle de la ruta dinámica.
 * - Estado: isPending / isError / data de TanStack Query.
 * - Efectos: GET `/products/{handle}.json`; no corre si el handle está vacío.
 * - Resultado: el `Product` mapeado, o error 404/red.
 */
export function useProduct(handle: string | undefined) {
  return useQuery({
    queryKey: productQueryKey(handle ?? ''),
    queryFn: () => fetchProductByHandle(handle!),
    enabled: Boolean(handle),
    staleTime: 5 * 60_000,
    retry: (failureCount, error) => {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 404) return false;
      return failureCount < 2;
    },
  });
}
