import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';

import { BrandDrawerContent } from '@/components/brand/BrandDrawerContent';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { colors, fonts } from '@/theme/colors';

export default function DrawerLayout() {
  const { t } = useTranslation();

  return (
    <Drawer
      drawerContent={(props) => <BrandDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: colors.encre,
        headerStyle: { backgroundColor: colors.ivoire },
        headerTitleStyle: { fontFamily: fonts.serifMedium, fontSize: 24 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        drawerStyle: { backgroundColor: colors.ivoire },
        drawerActiveTintColor: colors.encre,
        drawerActiveBackgroundColor: colors.lin,
        drawerInactiveTintColor: colors.taupe,
        drawerLabelStyle: { fontFamily: fonts.sansMedium, fontSize: 15 },
        sceneStyle: { backgroundColor: colors.ivoire },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Éclosion',
          headerTitle: () => <BrandLogo height={40} />,
          drawerLabel: t('nav.home'),
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="atelier"
        options={{
          title: t('nav.atelier'),
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: t('nav.about'),
          drawerIcon: ({ color, size }) => <Ionicons name="sparkles-outline" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}
