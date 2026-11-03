import { Screen } from '@/components/ui/Screen';
import { StateMessage } from '@/components/ui/StateMessage';

export default function AtelierScreen() {
  return (
    <Screen>
      <StateMessage
        icon="location-outline"
        title="Atelier en Mulhouse"
        description="Aquí irá el mapa del taller con tu ubicación (OpenStreetMap + Leaflet, hito 3)."
      />
    </Screen>
  );
}
