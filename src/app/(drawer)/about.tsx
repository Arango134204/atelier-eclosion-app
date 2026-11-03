import { ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';

export default function AboutScreen() {
  return (
    <Screen>
      <ScrollView contentContainerClassName="gap-6 px-6 pb-12 pt-4">
        <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">Atelier Éclosion Bijoux</Text>
        <Text className="font-serif text-4xl leading-[42px] text-encre">
          Revelar la luz de quien la lleva
        </Text>
        <Text className="font-sans-light text-base leading-7 text-taupe">
          Creaciones artesanales inspiradas en Colombia, donde se encuentran el color, el oficio y la feminidad. Cada
          pieza se imagina y se teje a mano, perla a perla, en el taller de Mulhouse, Francia.
        </Text>
        <View className="gap-1 border-t border-grege pt-6">
          <Text className="font-serif-italic text-xl text-encre">Tejidas a mano · Inspiradas en Colombia</Text>
          <Text className="font-sans text-sm text-taupe">Creadas en pequeñas series</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
