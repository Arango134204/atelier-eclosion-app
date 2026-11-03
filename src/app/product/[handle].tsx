import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { findProductByHandle } from '@/features/catalog/data/catalog.seed';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { formatPrice } from '@/utils/formatPrice';
import { shopifyImage } from '@/utils/shopifyImage';

export default function ProductDetailScreen() {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const product = handle ? findProductByHandle(handle) : undefined;

  if (!product) {
    return (
      <Screen>
        <Stack.Screen options={{ title: t('product.notFoundTitle') }} />
        <StateMessage
          icon="search-outline"
          title={t('product.notFoundHeading')}
          description={t('product.notFoundBody')}
          action={{ label: t('product.backToCatalog'), onPress: () => router.replace('/') }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView contentContainerClassName="pb-12">
        <View className="w-full overflow-hidden bg-lin" style={{ aspectRatio: 4 / 5 }}>
          {product.imageUrl ? (
            <Image
              source={{ uri: shopifyImage(product.imageUrl, 1200) }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={250}
            />
          ) : null}
        </View>
        <View className="gap-2 px-6 pt-6">
          <Text className="font-sans-medium text-xs uppercase tracking-[2px] text-taupe">
            {t(`productType.${product.type}`)}
          </Text>
          <Text className="font-serif text-4xl text-encre">{product.name}</Text>
          <Text className="font-sans text-lg text-or">{formatPrice(product.price, language, product.currency)}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
