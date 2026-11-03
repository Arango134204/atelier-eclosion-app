import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';

import { ProductCard } from '@/components/catalog/ProductCard';
import { Screen } from '@/components/ui/Screen';
import { catalogSeed } from '@/features/catalog/data/catalog.seed';
import type { Product } from '@/features/catalog/types/product';

function CatalogHeader() {
  const { t } = useTranslation();

  return (
    <View className="gap-3 pb-8 pt-2">
      <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">{t('catalog.eyebrow')}</Text>
      <Text className="font-serif text-4xl leading-[42px] text-encre">{t('catalog.title')}</Text>
      <Text className="font-sans-light text-base leading-6 text-taupe">{t('catalog.intro')}</Text>
    </View>
  );
}

export default function CatalogScreen() {
  const openProduct = (product: Product) => {
    router.push({ pathname: '/product/[handle]', params: { handle: product.handle } });
  };

  return (
    <Screen>
      <FlatList
        data={catalogSeed}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={CatalogHeader}
        columnWrapperClassName="gap-4"
        contentContainerClassName="gap-8 px-6 pb-10"
        renderItem={({ item }) => (
          <View className="flex-1">
            <ProductCard product={item} onPress={openProduct} />
          </View>
        )}
      />
    </Screen>
  );
}
