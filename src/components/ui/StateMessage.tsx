import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

import { colors } from '@/theme/colors';

import { AppButton } from './AppButton';

interface StateMessageProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}

/** Estado vacío, de error o "no encontrado", reutilizado en todas las pantallas. */
export function StateMessage({ icon, title, description, action }: StateMessageProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-10">
      <Ionicons name={icon} size={36} color={colors.or} />
      <Text className="text-center font-serif-medium text-2xl text-encre">{title}</Text>
      {description ? (
        <Text className="text-center font-sans-light text-base leading-6 text-taupe">{description}</Text>
      ) : null}
      {action ? <AppButton label={action.label} onPress={action.onPress} variant="secondary" className="mt-2" /> : null}
    </View>
  );
}
