import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { colors } from '@/theme/colors';

interface QuantityStepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  decreaseLabel: string;
  increaseLabel: string;
}

export function QuantityStepper({ value, min, max, onChange, decreaseLabel, increaseLabel }: QuantityStepperProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <View className="flex-row items-center" accessibilityRole="adjustable" accessibilityValue={{ min, max, now: value }}>
      <StepButton icon="remove" label={decreaseLabel} disabled={!canDecrease} onPress={() => onChange(value - 1)} />
      <View className="h-11 w-14 items-center justify-center overflow-hidden">
        <Animated.Text
          key={value}
          entering={FadeInDown.duration(220)}
          exiting={FadeOutUp.duration(160)}
          className="font-sans-medium text-xl text-encre"
        >
          {value}
        </Animated.Text>
      </View>
      <StepButton icon="add" label={increaseLabel} disabled={!canIncrease} onPress={() => onChange(value + 1)} />
    </View>
  );
}

interface StepButtonProps {
  icon: 'add' | 'remove';
  label: string;
  disabled: boolean;
  onPress: () => void;
}

function StepButton({ icon, label, disabled, onPress }: StepButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`h-11 w-11 items-center justify-center rounded-sm border border-grege active:bg-sable ${disabled ? 'opacity-30' : ''}`}
    >
      <Ionicons name={icon} size={18} color={colors.encre} />
    </Pressable>
  );
}