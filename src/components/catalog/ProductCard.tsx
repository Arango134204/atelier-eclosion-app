import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Product } from '@/features/catalog/types/product';
import { productTypeLabel } from '@/features/catalog/types/product';
import { colors } from '@/theme/colors';
import { formatPrice } from '@/utils/formatPrice';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.imageUrl !== null && !imageFailed;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${productTypeLabel[product.type]} ${product.name}, ${formatPrice(product.price)}`}
      onPress={() => onPress(product)}
      className="flex-1 active:opacity-80"
    >
      <View className="aspect-[4/5] overflow-hidden rounded-sm bg-lin">
        {showImage ? (
          <Image
            source={{ uri: product.imageUrl ?? undefined }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={250}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="image-outline" size={28} color={colors.taupeClair} />
          </View>
        )}
      </View>
      <Text className="mt-3 font-sans-medium text-[11px] uppercase tracking-[1.5px] text-taupe">
        {productTypeLabel[product.type]}
      </Text>
      <Text className="font-serif-medium text-xl text-encre">{product.name}</Text>
      <Text className="font-sans text-sm text-or">{formatPrice(product.price, product.currency)}</Text>
    </Pressable>
  );
}
