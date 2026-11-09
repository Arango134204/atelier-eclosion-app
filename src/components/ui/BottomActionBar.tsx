import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Barra fija al pie de pantalla para el total y la acción principal. */
export function BottomActionBar({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-t border-sable bg-porcelaine px-6 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
      {children}
    </View>
  );
}
