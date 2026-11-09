import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { findProductByHandle } from '@/features/catalog/data/catalog.seed';
import type { Product } from '@/features/catalog/types/product';
import { useFavoritesStore } from '@/store/favorites.store';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const handles = useFavoritesStore((state) => state.handles);
  const favorites = handles
    .map((handle) => findProductByHandle(handle))
    .filter((product): product is Product => product !== undefined);

  if (favorites.length === 0) {
    return (
      <Screen>
        <StateMessage
          icon="heart-outline"
          title={t('favorites.emptyTitle')}
          description={t('favorites.emptyBody')}
          action={{ label: t('favorites.explore'), onPress: () => router.navigate('/') }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ProductGrid
        products={favorites}
        contentClassName="gap-6 px-6 pb-10"
        header={
          <Text className="pt-4 font-sans-medium text-xs uppercase tracking-[3px] text-or">
            {t('favorites.count', { count: favorites.length })}
          </Text>
        }
      />
    </Screen>
  );
}
