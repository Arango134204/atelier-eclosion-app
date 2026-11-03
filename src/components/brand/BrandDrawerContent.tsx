import { DrawerContentScrollView, DrawerItemList, type DrawerContentComponentProps } from 'expo-router/drawer';
import { Text, View } from 'react-native';

import { BrandLogo } from './BrandLogo';

export function BrandDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center gap-3 border-b border-grege px-6 pb-6 pt-4">
        <BrandLogo height={96} />
        <Text className="font-serif-italic text-base text-taupe">Tejidas a mano, perla a perla</Text>
      </View>
      <View className="pt-3">
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}
