import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { Screen } from '@/components/ui/Screen';

function Section({ title, body, delay }: { title: string; body: string; delay: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(420)} className="gap-2">
      <Text className="font-serif-medium text-2xl text-encre">{title}</Text>
      <Text className="font-sans-light text-base leading-7 text-taupe">{body}</Text>
    </Animated.View>
  );
}

export default function AboutScreen() {
  const { t } = useTranslation();

  const sections = [
    { title: t('about.childhoodTitle'), body: t('about.childhood') },
    { title: t('about.franceTitle'), body: t('about.france') },
    { title: t('about.commerceTitle'), body: t('about.commerce') },
    { title: t('about.craftTitle'), body: t('about.craft') },
    { title: t('about.colombiaTitle'), body: t('about.colombia') },
    { title: t('about.philosophyTitle'), body: t('about.philosophy') },
    { title: t('about.materialsTitle'), body: t('about.materials') },
  ] as const;

  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-8 px-6 pb-14 pt-4">
        <View className="items-center py-2">
          <BrandLogo height={140} />
        </View>

        <Animated.View entering={FadeInDown.duration(420)} className="gap-3">
          <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">{t('about.eyebrow')}</Text>
          <Text className="font-serif text-4xl leading-[42px] text-encre">{t('about.title')}</Text>
          <Text className="font-serif-italic text-xl leading-7 text-encre">{t('about.greeting')}</Text>
          <Text className="font-sans-light text-base leading-7 text-taupe">{t('about.intro')}</Text>
        </Animated.View>

        {sections.map((section, index) => (
          <Section key={section.title} title={section.title} body={section.body} delay={80 + index * 40} />
        ))}

        <Animated.View entering={FadeInDown.delay(420).duration(420)} className="gap-3 border-t border-grege pt-8">
          <Text className="font-sans-light text-base leading-7 text-taupe">{t('about.closing')}</Text>
          <Text className="mt-2 font-serif-italic text-2xl text-encre">{t('about.signature')}</Text>
          <Text className="font-sans text-sm text-taupe">{t('about.series')}</Text>
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}
