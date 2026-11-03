import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function RequestsScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <StateMessage
        icon="document-text-outline"
        title={t('requests.emptyTitle')}
        description={t('requests.emptyBody')}
        action={{ label: t('favorites.explore'), onPress: () => router.navigate('/') }}
      />
    </Screen>
  );
}
