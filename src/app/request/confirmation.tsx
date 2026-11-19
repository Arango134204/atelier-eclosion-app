import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';

import { AppButton } from '@/components/ui/AppButton';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { useRequestDraftStore } from '@/store/requestDraft.store';
import { useRequestsStore } from '@/store/requests.store';
import { colors } from '@/theme/colors';

export default function ConfirmationScreen() {
  const { t } = useTranslation();
  const { id, outcome } = useLocalSearchParams<{ id: string; outcome?: string }>();
  const request = useRequestsStore((state) => state.requests.find((item) => item.id === id));
  const resetDraft = useRequestDraftStore((state) => state.reset);
  const sent = outcome === 'sent' || request?.status === 'sent';

  const leaveTo = (path: '/requests' | '/') => {
    resetDraft();
    router.dismissAll();
    router.navigate(path);
  };

  if (!request) {
    return (
      <Screen>
        <StateMessage
          icon="document-text-outline"
          title={t('confirmation.notFound')}
          action={{ label: t('product.backToCatalog'), onPress: () => leaveTo('/') }}
        />
      </Screen>
    );
  }

  const firstName = request.contact.name.split(' ')[0];

  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <View className="flex-1 items-center justify-center gap-5 px-10">
        <Animated.View
          entering={ZoomIn.springify().damping(12)}
          className="h-20 w-20 items-center justify-center rounded-full bg-or-pale"
        >
          <Ionicons name="checkmark" size={40} color={colors.bordeaux} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(180).duration(420)} className="items-center gap-3">
          <Text className="text-center font-serif text-4xl text-encre">{t('confirmation.title', { name: firstName })}</Text>
          <Text className="text-center font-sans text-base text-encre">
            {t('confirmation.body', { number: request.number })}
          </Text>
          <Text className="text-center font-sans-light text-sm leading-5 text-taupe">
            {t(sent ? 'confirmation.sentNote' : 'confirmation.localNote')}
          </Text>
        </Animated.View>
      </View>
      <Animated.View entering={FadeInDown.delay(320).duration(420)} className="gap-3 px-6 pb-6">
        <AppButton label={t('confirmation.viewRequests')} onPress={() => leaveTo('/requests')} />
        <AppButton label={t('confirmation.keepBrowsing')} onPress={() => leaveTo('/')} variant="secondary" />
      </Animated.View>
    </Screen>
  );
}
