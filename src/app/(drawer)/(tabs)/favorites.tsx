import { router } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function FavoritesScreen() {
  return (
    <Screen>
      <StateMessage
        icon="heart-outline"
        title="Aún no tienes favoritos"
        description="Guarda las piezas que te gusten para encontrarlas después."
        action={{ label: 'Explorar catálogo', onPress: () => router.navigate('/') }}
      />
    </Screen>
  );
}
