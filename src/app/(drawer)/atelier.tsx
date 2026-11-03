import { useTranslation } from 'react-i18next';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function AtelierScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <StateMessage icon="location-outline" title={t('atelier.title')} description={t('atelier.body')} />
    </Screen>
  );
}
