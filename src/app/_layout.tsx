import '@/global.css';
import '@/i18n';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useLanguageSync } from '@/i18n/useLanguageSync';
import { colors, fonts } from '@/theme/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.serif]: require('@/assets/fonts/CormorantGaramond-Regular.ttf'),
    [fonts.serifMedium]: require('@/assets/fonts/CormorantGaramond-Medium.ttf'),
    [fonts.serifItalic]: require('@/assets/fonts/CormorantGaramond-Italic.ttf'),
    [fonts.sans]: require('@/assets/fonts/Jost-Regular.ttf'),
    [fonts.sansLight]: require('@/assets/fonts/Jost-Light.ttf'),
    [fonts.sansMedium]: require('@/assets/fonts/Jost-Medium.ttf'),
  });
  const languageReady = useLanguageSync();
  const { t } = useTranslation();

  // Si una fuente falla se continúa con la del sistema en lugar de bloquear la app.
  const ready = (fontsLoaded || fontError !== null) && languageReady;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerTintColor: colors.encre,
          headerStyle: { backgroundColor: colors.ivoire },
          headerTitleStyle: { fontFamily: fonts.serifMedium, fontSize: 22 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.ivoire },
        }}
      >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[handle]" options={{ title: '' }} />
        <Stack.Screen name="request/quote" options={{ title: t('nav.quote') }} />
        <Stack.Screen name="request/contact" options={{ title: t('nav.contact') }} />
        <Stack.Screen
          name="request/confirmation"
          options={{ title: t('nav.confirmation'), headerBackVisible: false, gestureEnabled: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
