import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import type { Product } from '@/features/catalog/types/product';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { colors } from '@/theme/colors';
import { formatPrice } from '@/utils/formatPrice';
import { shopifyImage } from '@/utils/shopifyImage';

import { FavoriteButton } from './FavoriteButton';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  /** Posición en la lista; escalona la entrada de las primeras tarjetas. */
  index?: number;
}

const STAGGER_MS = 70;
const MAX_STAGGERED = 6;

export function ProductCard({ product, onPress, index = 0 }: ProductCardProps) {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = product.imageUrl !== null && !imageFailed;
  const typeLabel = t(`productType.${product.type}`);
  const price = formatPrice(product.price, language, product.currency);

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, MAX_STAGGERED) * STAGGER_MS).duration(420)}
      className="flex-1"
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${typeLabel} ${product.name}, ${price}`}
        onPress={() => onPress(product)}
        className="flex-1 active:opacity-80"
      >
        <View className="w-full overflow-hidden rounded-sm bg-lin" style={{ aspectRatio: 4 / 5 }}>
          {showImage && product.imageUrl ? (
            <Image
              source={{ uri: shopifyImage(product.imageUrl, 600) }}
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
          <View className="absolute right-2 top-2">
            <FavoriteButton handle={product.handle} size={18} />
          </View>
        </View>
        <Text className="mt-3 font-sans-medium text-[11px] uppercase tracking-[1.5px] text-taupe">{typeLabel}</Text>
        <Text className="font-serif-medium text-xl text-encre">{product.name}</Text>
        <Text className="font-sans text-sm text-or">{price}</Text>
      </Pressable>
    </Animated.View>
  );
}
