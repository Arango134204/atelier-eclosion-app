import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '../api/shopify.service';

export const productsQueryKey = ['products'] as const;

/**
 * Listado del catálogo desde Shopify.
 *
 * - Entradas: ninguna (consulta el listado completo).
 * - Estado: el que expone TanStack Query (isPending, isError, data…).
 * - Efectos: petición HTTP vía Axios; caché 5 minutos.
 * - Resultado: la lista de `Product` ya mapeada, o el estado de error/carga.
 */
export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    staleTime: 5 * 60_000,
  });
}
