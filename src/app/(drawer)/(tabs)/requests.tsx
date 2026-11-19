import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Switch, Text, View } from 'react-native';

import { RequestCard } from '@/components/request/RequestCard';
import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';
import { useRequestsStore } from '@/store/requests.store';
import { colors } from '@/theme/colors';

export default function RequestsScreen() {
  const { t } = useTranslation();
  const requests = useRequestsStore((state) => state.requests);
  const [onlyCustom, setOnlyCustom] = useState(false);

  const visible = onlyCustom ? requests.filter((item) => item.surMesure) : requests;

  const filterControl = (
    <View className="flex-row items-center justify-between gap-4 pb-4 pt-4">
      <Text className="flex-1 font-sans-medium text-sm text-encre">{t('requests.onlyCustom')}</Text>
      <Switch
        value={onlyCustom}
        onValueChange={setOnlyCustom}
        accessibilityLabel={t('requests.onlyCustom')}
        trackColor={{ false: colors.grege, true: colors.or }}
        thumbColor={colors.ivoire}
      />
    </View>
  );

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

  if (onlyCustom && visible.length === 0) {
    return (
      <Screen>
        <View className="flex-1 px-6">
          {filterControl}
          <StateMessage
            icon="document-text-outline"
            title={t('requests.emptyCustomTitle')}
            description={t('requests.emptyCustomBody')}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {filterControl}
            <Text className="pb-2 font-sans-light text-sm leading-5 text-taupe">{t('confirmation.localNote')}</Text>
          </View>
        }
        contentContainerClassName="px-6 pb-10"
        renderItem={({ item, index }) => <RequestCard request={item} index={index} />}
      />
    </Screen>
  );
}
