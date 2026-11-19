import * as Linking from 'expo-linking';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { buildAtelierMapHtml } from '@/features/atelier/buildAtelierMapHtml';
import { useLocationTracking } from '@/features/atelier/useLocationTracking';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { colors } from '@/theme/colors';

export default function AtelierScreen() {
  const { t } = useTranslation();
  const language = useAppLanguage();
  const location = useLocationTracking();
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  const html = useMemo(
    () => buildAtelierMapHtml({ device: location.coords, language }),
    [location.coords, language],
  );

  return (
    <Screen edges={['left', 'right', 'bottom']} className="gap-3">
      <View className="gap-2 px-6 pt-2">
        <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">{t('atelier.subtitle')}</Text>
        <Text className="font-serif text-3xl text-encre">{t('atelier.title')}</Text>
        <Text className="font-sans-light text-sm leading-5 text-taupe">{t('atelier.body')}</Text>
        <View className="mt-1 flex-row gap-4">
          <LegendDot color={colors.or} label={t('atelier.legendAtelier')} />
          <LegendDot color={colors.encre} label={t('atelier.legendYou')} />
        </View>
      </View>

      <View className="mx-6 min-h-[280px] flex-1 overflow-hidden rounded-sm border border-sable bg-lin">
        {!mapReady && !mapError ? (
          <View className="absolute inset-0 z-10 items-center justify-center gap-2 bg-lin">
            <ActivityIndicator color={colors.or} />
            <Text className="font-sans-light text-xs text-taupe">{t('atelier.mapLoading')}</Text>
          </View>
        ) : null}
        {mapError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center font-sans-light text-sm text-taupe">{t('atelier.mapError')}</Text>
          </View>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ html }}
            style={{ flex: 1, backgroundColor: colors.lin }}
            onLoadEnd={() => setMapReady(true)}
            onError={() => setMapError(true)}
            setSupportMultipleWindows={false}
          />
        )}
      </View>

      {location.error === 'permission' ? (
        <Text className="px-6 font-sans text-xs leading-5 text-erreur">{t('atelier.permissionDenied')}</Text>
      ) : null}
      {location.error === 'unavailable' ? (
        <Text className="px-6 font-sans text-xs leading-5 text-erreur">{t('atelier.unavailable')}</Text>
      ) : null}

      <View className="gap-2 px-6 pb-4">
        <View className="flex-row gap-2">
          <AppButton label={t('atelier.center')} onPress={() => location.centerOnce()} variant="secondary" className="flex-1" />
          {location.tracking ? (
            <AppButton label={t('atelier.pause')} onPress={() => location.pauseTracking()} variant="secondary" className="flex-1" />
          ) : (
            <AppButton
              label={location.coords ? t('atelier.resume') : t('atelier.start')}
              onPress={() => (location.coords ? location.resumeTracking() : location.startTracking())}
              className="flex-1"
            />
          )}
        </View>
        {location.permission === 'denied' ? (
          <AppButton label={t('atelier.openSettings')} onPress={() => Linking.openSettings()} variant="secondary" />
        ) : null}
      </View>
    </Screen>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <Text className="font-sans text-xs text-taupe">{label}</Text>
    </View>
  );
}
