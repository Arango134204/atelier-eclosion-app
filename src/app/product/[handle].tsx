import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { findProductByHandle } from '@/features/catalog/data/catalog.seed';
import { productTypeLabel } from '@/features/catalog/types/product';
import { formatPrice } from '@/utils/formatPrice';

export default function ProductDetailScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const product = handle ? findProductByHandle(handle) : undefined;

  if (!product) {
    return (
      <Screen>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <StateMessage
          icon="search-outline"
          title="Esta pieza no existe"
          description="Es posible que se haya agotado o que el enlace sea incorrecto."
          action={{ label: 'Volver al catálogo', onPress: () => router.replace('/') }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView contentContainerClassName="pb-12">
        <View className="aspect-[4/5] bg-lin">
          {product.imageUrl ? (
            <Image
              source={{ uri: product.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={250}
            />
          ) : null}
        </View>
        <View className="gap-2 px-6 pt-6">
          <Text className="font-sans-medium text-xs uppercase tracking-[2px] text-taupe">
            {productTypeLabel[product.type]}
          </Text>
          <Text className="font-serif text-4xl text-encre">{product.name}</Text>
          <Text className="font-sans text-lg text-or">{formatPrice(product.price, product.currency)}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
