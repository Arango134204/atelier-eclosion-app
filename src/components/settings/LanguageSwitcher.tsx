import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from '@/i18n';
import { useAppLanguage } from '@/i18n/useAppLanguage';
import { useSettingsStore } from '@/store/settings.store';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const current = useAppLanguage();
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <View className="gap-3">
      <Text className="font-sans-medium text-[11px] uppercase tracking-[2px] text-taupe">{t('language.label')}</Text>
      <View accessibilityRole="radiogroup" className="flex-row rounded-sm border border-grege p-1">
        {SUPPORTED_LANGUAGES.map((language) => {
          const selected = language === current;
          return (
            <Pressable
              key={language}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={t(`language.${language}`)}
              onPress={() => setLanguage(language)}
              className={`flex-1 items-center rounded-sm py-2 ${selected ? 'bg-encre' : 'bg-transparent'}`}
            >
              <Text
                className={`font-sans-medium text-[13px] uppercase tracking-[2px] ${selected ? 'text-ivoire' : 'text-taupe'}`}
              >
                {language}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
