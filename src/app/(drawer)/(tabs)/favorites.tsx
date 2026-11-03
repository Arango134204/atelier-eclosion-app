import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function FavoritesScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <StateMessage
        icon="heart-outline"
        title={t('favorites.emptyTitle')}
        description={t('favorites.emptyBody')}
        action={{ label: t('favorites.explore'), onPress: () => router.navigate('/') }}
      />
    </Screen>
  );
}
