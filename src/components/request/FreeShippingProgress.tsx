import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FreeShippingProgressProps {
  /** 0 a 1. */
  progress: number;
  label: string;
}

export function FreeShippingProgress({ progress, label }: FreeShippingProgressProps) {
  const width = useSharedValue(progress);
  const fillStyle = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));

  useEffect(() => {
    width.value = withTiming(Math.min(1, Math.max(0, progress)), { duration: 450 });
  }, [progress, width]);

  return (
    <View className="gap-2">
      <Text className="font-sans text-xs text-taupe">{label}</Text>
      <View className="h-[3px] w-full overflow-hidden rounded-full bg-sable">
        <Animated.View className="h-full rounded-full bg-or" style={fillStyle} />
      </View>
    </View>
  );
}
