import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import type { RequestStatus } from '@/features/request/types';

const backgroundByStatus: Record<RequestStatus, string> = {
  saved: 'bg-lin',
  sent: 'bg-or-pale',
  inReview: 'bg-or-pale',
  confirmed: 'bg-sable',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const { t } = useTranslation();

  return (
    <View className={`self-start rounded-sm px-2 py-1 ${backgroundByStatus[status]}`}>
      <Text className="font-sans-medium text-[10px] uppercase tracking-[1.5px] text-encre">{t(`requests.status_${status}`)}</Text>
    </View>
  );
}
