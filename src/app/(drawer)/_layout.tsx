import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';

import { colors, fonts } from '@/theme/colors';

export default function DrawerLayout() {
  return (
    <Drawer
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
          drawerLabel: 'Inicio',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="atelier"
        options={{
          title: 'El taller',
          drawerLabel: 'El taller',
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'La marca',
          drawerLabel: 'La marca',
          drawerIcon: ({ color, size }) => <Ionicons name="sparkles-outline" color={color} size={size} />,
        }}
      />
    </Drawer>
  );
}
