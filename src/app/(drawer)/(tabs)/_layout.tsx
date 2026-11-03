import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { colors, fonts } from '@/theme/colors';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.encre,
        tabBarInactiveTintColor: colors.taupeClair,
        tabBarLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 11, letterSpacing: 0.4 },
        tabBarStyle: { backgroundColor: colors.ivoire, borderTopColor: colors.grege },
        sceneStyle: { backgroundColor: colors.ivoire },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('nav.catalog'),
          tabBarIcon: ({ color, size }) => <Ionicons name="diamond-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('nav.favorites'),
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: t('nav.requests'),
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
