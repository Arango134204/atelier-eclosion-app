import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

import { useFavoritesStore, useIsFavorite } from '@/store/favorites.store';
import { colors } from '@/theme/colors';

interface FavoriteButtonProps {
  handle: string;
  /** `overlay`: círculo marfil sobre la foto. `plain`: solo el icono. */
  variant?: 'overlay' | 'plain';
  size?: number;
}

export function FavoriteButton({ handle, variant = 'overlay', size = 20 }: FavoriteButtonProps) {
  const { t } = useTranslation();
  const isFavorite = useIsFavorite(handle);
  const toggle = useFavoritesStore((state) => state.toggle);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const onPress = () => {
    if (!isFavorite) {
      scale.value = withSequence(withSpring(1.3, { damping: 6, stiffness: 400 }), withSpring(1, { damping: 10 }));
    }
    toggle(handle);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isFavorite }}
      accessibilityLabel={t(isFavorite ? 'product.removeFavorite' : 'product.addFavorite')}
      hitSlop={8}
      onPress={onPress}
      className={variant === 'overlay' ? 'h-9 w-9 items-center justify-center rounded-full bg-ivoire/85' : 'p-1'}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size}
          color={isFavorite ? colors.bordeaux : colors.encre}
        />
      </Animated.View>
    </Pressable>
  );
}
