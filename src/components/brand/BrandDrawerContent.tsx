import { DrawerContentScrollView, DrawerItemList, type DrawerContentComponentProps } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { LanguageSwitcher } from '@/components/settings/LanguageSwitcher';

import { BrandLogo } from './BrandLogo';

export function BrandDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="items-center gap-3 border-b border-grege px-6 pb-6 pt-4">
        <BrandLogo height={96} />
        <Text className="font-serif-italic text-base text-taupe">{t('brand.tagline')}</Text>
      </View>
      <View className="flex-1 pt-3">
        <DrawerItemList {...props} />
      </View>
      <View className="px-5 pb-6 pt-4">
        <LanguageSwitcher />
      </View>
    </DrawerContentScrollView>
  );
}
