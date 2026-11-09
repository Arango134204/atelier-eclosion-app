import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, Text } from 'react-native';

import { RequestCard } from '@/components/request/RequestCard';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { useRequestsStore } from '@/store/requests.store';

export default function RequestsScreen() {
  const { t } = useTranslation();
  const requests = useRequestsStore((state) => state.requests);

  if (requests.length === 0) {
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

  return (
    <Screen>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text className="pb-2 pt-4 font-sans-light text-sm leading-5 text-taupe">{t('confirmation.localNote')}</Text>
        }
        contentContainerClassName="px-6 pb-10"
        renderItem={({ item, index }) => <RequestCard request={item} index={index} />}
      />
    </Screen>
  );
}
