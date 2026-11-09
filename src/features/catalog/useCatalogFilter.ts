import { useMemo, useState } from 'react';

import type { Product, ProductType } from './types/product';

export type CatalogFilter = 'all' | ProductType;

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/**
 * Búsqueda por nombre + filtro por tipo sobre una lista de productos.
 *
 * - Entradas: la lista completa.
 * - Estado: el texto buscado y el filtro activo.
 * - Efectos: ninguno; la lista filtrada se deriva con `useMemo`.
 * - Resultado: la lista visible y los controles para cambiar búsqueda/filtro o reiniciarlos.
 *   La búsqueda ignora mayúsculas y tildes ("peonía" encuentra "Peonia").
 */
export function useCatalogFilter(products: Product[]) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CatalogFilter>('all');

  const visible = useMemo(() => {
    const needle = normalize(query);
    return products.filter(
      (product) => (filter === 'all' || product.type === filter) && normalize(product.name).includes(needle),
    );
  }, [products, query, filter]);

  const reset = () => {
    setQuery('');
    setFilter('all');
  };

  return { query, setQuery, filter, setFilter, visible, reset };
}
