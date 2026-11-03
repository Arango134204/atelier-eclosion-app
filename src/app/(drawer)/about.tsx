import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { Screen } from '@/components/ui/Screen';

export default function AboutScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-6 px-6 pb-12 pt-4">
        <View className="items-center py-4">
          <BrandLogo height={160} />
        </View>
        <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">{t('about.eyebrow')}</Text>
        <Text className="font-serif text-4xl leading-[42px] text-encre">{t('about.title')}</Text>
        <Text className="font-sans-light text-base leading-7 text-taupe">{t('about.body')}</Text>
        <View className="gap-1 border-t border-grege pt-6">
          <Text className="font-serif-italic text-xl text-encre">{t('about.signature')}</Text>
          <Text className="font-sans text-sm text-taupe">{t('about.series')}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
