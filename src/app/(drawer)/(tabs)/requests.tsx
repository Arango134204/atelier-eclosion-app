import { router } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function RequestsScreen() {
  return (
    <Screen>
      <StateMessage
        icon="document-text-outline"
        title="Sin solicitudes todavía"
        description="Aquí verás tus pedidos y solicitudes sur mesure con su estado."
        action={{ label: 'Explorar catálogo', onPress: () => router.navigate('/') }}
      />
    </Screen>
  );
}
