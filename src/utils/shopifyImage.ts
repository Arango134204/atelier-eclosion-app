/**
 * Las fotos originales de la tienda miden varios miles de píxeles y Android las dibuja mal o lento.
 * El CDN de Shopify devuelve una versión redimensionada con el parámetro `width`.
 */
export function shopifyImage(url: string, width: number): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}width=${width}`;
}
