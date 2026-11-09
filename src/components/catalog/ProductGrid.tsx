import { router } from 'expo-router';
import type { ReactElement } from 'react';
import { FlatList, View } from 'react-native';

import type { Product } from '@/features/catalog/types/product';

import { ProductCard } from './ProductCard';

const COLUMNS = 2;
type GridCell = Product | { id: string; spacer: true };

interface ProductGridProps {
  products: Product[];
  header?: ReactElement;
  empty?: ReactElement;
  contentClassName?: string;
}

const openProduct = (product: Product) =>
  router.push({ pathname: '/product/[handle]', params: { handle: product.handle } });

/** Cuadrícula de 2 columnas; rellena la última fila para que una pieza sola no ocupe todo el ancho. */
export function ProductGrid({ products, header, empty, contentClassName = 'gap-8 px-6 pb-10' }: ProductGridProps) {
  const cells: GridCell[] =
    products.length % COLUMNS === 0 ? products : [...products, { id: 'spacer', spacer: true }];

  return (
    <FlatList
      data={cells}
      keyExtractor={(item) => item.id}
      numColumns={COLUMNS}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      columnWrapperClassName="gap-4"
      contentContainerClassName={contentClassName}
      renderItem={({ item, index }) =>
        'spacer' in item ? (
          <View className="flex-1" />
        ) : (
          <ProductCard product={item} index={index} onPress={openProduct} />
        )
      }
    />
  );
}
