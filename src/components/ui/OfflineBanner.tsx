import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export function OfflineBanner() {
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  if (isOnline) return null;

  return (
    <View className="bg-bordeaux px-4 py-2">
      <Text className="text-center font-sans text-xs text-ivoire">{t('network.offline')}</Text>
    </View>
  );
}
