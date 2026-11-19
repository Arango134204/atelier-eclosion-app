import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

/**
 * Observa la conectividad del dispositivo.
 *
 * - Entradas: ninguna.
 * - Estado: `isOnline` (true si hay conexión usable).
 * - Efectos: suscripción a NetInfo; se limpia al desmontar.
 * - Resultado: bandera booleana para banners y para decidir envío remoto.
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return unsubscribe;
  }, []);

  return { isOnline };
}
