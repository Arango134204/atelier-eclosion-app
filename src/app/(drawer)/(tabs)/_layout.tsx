import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { colors, fonts } from '@/theme/colors';

export default function TabsLayout() {
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
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => <Ionicons name="diamond-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Mis solicitudes',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
