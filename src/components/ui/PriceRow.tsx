import { Text, View } from 'react-native';

interface PriceRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export function PriceRow({ label, value, emphasis = false }: PriceRowProps) {
  return (
    <View className={`flex-row items-baseline justify-between ${emphasis ? 'border-t border-grege pt-4' : ''}`}>
      <Text className={emphasis ? 'font-serif-medium text-2xl text-encre' : 'font-sans text-sm text-taupe'}>{label}</Text>
      <Text className={emphasis ? 'font-serif-medium text-2xl text-encre' : 'font-sans text-sm text-encre'}>{value}</Text>
    </View>
  );
}
