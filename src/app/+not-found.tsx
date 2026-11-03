import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <StateMessage
        icon="compass-outline"
        title={t('notFound.heading')}
        action={{ label: t('notFound.goHome'), onPress: () => router.replace('/') }}
      />
    </Screen>
  );
}
