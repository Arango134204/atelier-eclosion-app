import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  /** Bordes con área segura. Las pantallas con header solo necesitan los laterales. */
  edges?: Edge[];
  className?: string;
}

export function Screen({ children, edges = ['left', 'right'], className = '' }: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-ivoire">
      <View className={`flex-1 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}
