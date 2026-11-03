import { Pressable, Text } from 'react-native';

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

export function AppButton({ label, onPress, variant = 'primary', disabled = false, className = '' }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      className={`min-h-[52px] items-center justify-center rounded-sm px-7 active:opacity-80 ${containerByVariant[variant]} ${disabled ? 'opacity-40' : ''} ${className}`}
    >
      <Text className={`font-sans-medium text-[13px] uppercase tracking-[2px] ${labelByVariant[variant]}`}>{label}</Text>
    </Pressable>
  );
}
