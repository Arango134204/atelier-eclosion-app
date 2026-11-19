import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export type LocationPermission = 'undetermined' | 'granted' | 'denied';

export interface DeviceCoords {
  latitude: number;
  longitude: number;
}

/**
 * Seguimiento de ubicación en primer plano para el mapa del taller.
 *
 * - Entradas: ninguna; el consumidor decide cuándo activar/pausar/reanudar.
 * - Estado: permiso, coordenadas actuales, si el seguimiento está activo y el último error.
 * - Efectos: solicita permiso, suscribe a `watchPositionAsync`, relee el permiso al volver de Ajustes (AppState) y libera la suscripción al desmontar o pausar.
 * - Resultado: coordenadas del dispositivo (distintas del marcador fijo del taller) y controles de seguimiento.
 */
export function useLocationTracking() {
  const [permission, setPermission] = useState<LocationPermission>('undetermined');
  const [coords, setCoords] = useState<DeviceCoords | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscription = useRef<Location.LocationSubscription | null>(null);
  const appState = useRef<AppStateStatus>((AppState.currentState ?? 'active') as AppStateStatus);

  const stopWatching = useCallback(async () => {
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
    setTracking(false);
  }, []);

  const requestPermission = useCallback(async () => {
    setError(null);
    const current = await Location.getForegroundPermissionsAsync();
    if (current.granted) {
      setPermission('granted');
      return true;
    }
    const asked = await Location.requestForegroundPermissionsAsync();
    if (asked.granted) {
      setPermission('granted');
      return true;
    }
    setPermission('denied');
    setError('permission');
    return false;
  }, []);

  const centerOnce = useCallback(async () => {
    setError(null);
    const granted = permission === 'granted' || (await requestPermission());
    if (!granted) return null;
    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const next = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      setCoords(next);
      return next;
    } catch {
      setError('unavailable');
      return null;
    }
  }, [permission, requestPermission]);

  const startTracking = useCallback(async () => {
    setError(null);
    const granted = permission === 'granted' || (await requestPermission());
    if (!granted) return;
    await stopWatching();
    try {
      subscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 15,
          timeInterval: 3000,
        },
        (position) => {
          setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
      );
      setTracking(true);
    } catch {
      setError('unavailable');
      setTracking(false);
    }
  }, [permission, requestPermission, stopWatching]);

  const pauseTracking = useCallback(async () => {
    await stopWatching();
  }, [stopWatching]);

  const resumeTracking = useCallback(async () => {
    await startTracking();
  }, [startTracking]);

  const refreshPermission = useCallback(async () => {
    const current = await Location.getForegroundPermissionsAsync();
    if (current.granted) {
      setPermission('granted');
      setError((prev) => (prev === 'permission' ? null : prev));
      return;
    }
    if (current.canAskAgain === false) {
      setPermission('denied');
      setError('permission');
      return;
    }
    setPermission(current.status === 'undetermined' ? 'undetermined' : 'denied');
  }, []);

  useEffect(() => {
    void refreshPermission();
  }, [refreshPermission]);

  useEffect(() => {
    const onChange = (next: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        void refreshPermission();
      }
      appState.current = next;
    };
    const sub = AppState.addEventListener('change', onChange);
    return () => sub.remove();
  }, [refreshPermission]);

  useEffect(() => {
    return () => {
      subscription.current?.remove();
      subscription.current = null;
    };
  }, []);

  return {
    permission,
    coords,
    tracking,
    error,
    requestPermission,
    centerOnce,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopWatching,
  };
}
