import { router, Stack } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Página no encontrada' }} />
      <StateMessage
        icon="compass-outline"
        title="Esta página no existe"
        action={{ label: 'Ir al inicio', onPress: () => router.replace('/') }}
      />
    </Screen>
  );
}
