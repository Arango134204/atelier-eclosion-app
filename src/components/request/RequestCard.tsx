import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import type { SavedRequest } from '@/features/request/types';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { formatDate, formatNumber } from '@/utils/formatLocale';
import { formatPrice } from '@/utils/formatPrice';
import { shopifyImage } from '@/utils/shopifyImage';

import { StatusBadge } from './StatusBadge';

export function RequestCard({ request, index }: { request: SavedRequest; index: number }) {
  const { t } = useTranslation();
  const language = useAppLanguage();

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 6) * 60).duration(380)}
      className="flex-row gap-4 border-b border-sable py-5"
    >
      <View className="h-24 w-20 overflow-hidden rounded-sm bg-lin">
        {request.productImageUrl ? (
          <Image
            source={{ uri: shopifyImage(request.productImageUrl, 300) }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        ) : null}
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-sans-medium text-[11px] uppercase tracking-[2px] text-taupe">{request.number}</Text>
          <Text className="font-sans text-xs text-taupe-clair">{formatDate(request.createdAt, language)}</Text>
        </View>
        <Text className="font-serif-medium text-xl text-encre">
          {request.productName} × {request.quantity}
        </Text>
        {request.surMesure ? (
          <Text className="font-sans text-xs text-bordeaux">
            {t('requests.surMesureTag')}
            {request.customLengthCm !== null ? ` · ${formatNumber(request.customLengthCm, language)} cm` : ''}
          </Text>
        ) : null}
        <View className="mt-1 flex-row items-center justify-between">
          <StatusBadge status={request.status} />
          <Text className="font-sans-medium text-base text-encre">{formatPrice(request.quote.total, language)}</Text>
        </View>
      </View>
    </Animated.View>
  );
}
