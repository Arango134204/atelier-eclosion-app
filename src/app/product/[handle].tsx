import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { FavoriteButton } from '@/components/catalog/FavoriteButton';
import { AppButton } from '@/components/ui/AppButton';
import { BottomActionBar } from '@/components/ui/BottomActionBar';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { findProductByHandle } from '@/features/catalog/data/catalog.seed';
import { QUANTITY_MAX, QUANTITY_MIN } from '@/features/quote/quote.rules';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { useRequestDraftStore } from '@/store/requestDraft.store';
import { formatPrice } from '@/utils/formatPrice';
import { shopifyImage } from '@/utils/shopifyImage';

export default function ProductDetailScreen() {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const product = handle ? findProductByHandle(handle) : undefined;
  const [quantity, setQuantity] = useState(QUANTITY_MIN);
  const startDraft = useRequestDraftStore((state) => state.start);

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

  const composeRequest = () => {
    startDraft(product.handle, quantity);
    router.push('/request/quote');
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => <FavoriteButton handle={product.handle} variant="plain" size={24} />,
        }}
      />
      <ScrollView contentContainerClassName="pb-8">
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
        <Animated.View entering={FadeIn.delay(120).duration(400)} className="gap-2 px-6 pt-6">
          <Text className="font-sans-medium text-xs uppercase tracking-[2px] text-taupe">
            {t(`productType.${product.type}`)}
          </Text>
          <Text className="font-serif text-4xl text-encre">{product.name}</Text>
          <Text className="font-sans text-lg text-or">{formatPrice(product.price, language, product.currency)}</Text>
          <Text className="mt-4 font-sans-light text-base leading-6 text-taupe">{t('product.craft')}</Text>
          <Text className="font-sans text-xs uppercase tracking-[1.5px] text-taupe-clair">{t('product.craftPoints')}</Text>

          <View className="mt-6 flex-row items-center justify-between border-t border-sable pt-6">
            <View>
              <Text className="font-sans-medium text-[11px] uppercase tracking-[2px] text-taupe">
                {t('product.quantity')}
              </Text>
              <Text className="mt-1 font-sans text-xs text-taupe-clair">
                {t('product.quantityMax', { max: QUANTITY_MAX })}
              </Text>
            </View>
            <QuantityStepper
              value={quantity}
              min={QUANTITY_MIN}
              max={QUANTITY_MAX}
              onChange={setQuantity}
              decreaseLabel={t('product.decrease')}
              increaseLabel={t('product.increase')}
            />
          </View>
        </Animated.View>
      </ScrollView>

      <BottomActionBar>
        <View className="flex-row items-center gap-4">
          <View>
            <Text className="font-sans-medium text-[11px] uppercase tracking-[2px] text-taupe">{t('product.total')}</Text>
            <Text className="font-serif-medium text-2xl text-encre">
              {formatPrice(product.price * quantity, language, product.currency)}
            </Text>
          </View>
          <AppButton label={t('product.compose')} onPress={composeRequest} className="flex-1" />
        </View>
      </BottomActionBar>
    </Screen>
  );
}
