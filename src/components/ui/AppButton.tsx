import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ButtonVariant = 'primary' | 'secondary';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const containerByVariant: Record<ButtonVariant, string> = {
  primary: 'bg-encre',
  secondary: 'border border-encre bg-transparent',
};

const labelByVariant: Record<ButtonVariant, string> = {
  primary: 'text-ivoire',
  secondary: 'text-encre',
};

const PRESSED_SCALE = 0.97;

export function AppButton({ label, onPress, variant = 'primary', disabled = false, className = '' }: AppButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View style={animatedStyle} className={className}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onPress={onPress}
        onPressIn={() => (scale.value = withTiming(PRESSED_SCALE, { duration: 120 }))}
        onPressOut={() => (scale.value = withTiming(1, { duration: 160 }))}
        disabled={disabled}
        className={`min-h-[52px] items-center justify-center rounded-sm px-7 ${containerByVariant[variant]} ${disabled ? 'opacity-40' : ''}`}
      >
        <Text className={`font-sans-medium text-[13px] uppercase tracking-[2px] ${labelByVariant[variant]}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}
