import { Pressable, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`h-9 justify-center rounded-sm border px-4 ${selected ? 'border-encre bg-encre' : 'border-grege bg-transparent active:bg-lin'}`}
    >
      <Text className={`font-sans-medium text-[12px] uppercase tracking-[1.5px] ${selected ? 'text-ivoire' : 'text-taupe'}`}>
        {label}
      </Text>
    </Pressable>
  );
}
