import { catalogSeed } from './data/catalog.seed';
import type { Product } from './types/product';

/** Busca una pieza en la lista remota y, si aún no está, en la semilla local de respaldo. */
export function resolveProduct(handle: string, remote: Product[] | undefined): Product | undefined {
  return remote?.find((product) => product.handle === handle) ?? catalogSeed.find((product) => product.handle === handle);
}
