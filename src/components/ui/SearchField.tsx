import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, TextInput, View } from 'react-native';

import { colors, fonts } from '@/theme/colors';

interface SearchFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  clearLabel: string;
}

export function SearchField({ value, onChangeText, placeholder, clearLabel }: SearchFieldProps) {
  return (
    <View className="h-12 flex-row items-center gap-3 border-b border-grege">
      <Ionicons name="search-outline" size={18} color={colors.taupeClair} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.taupeClair}
        returnKeyType="search"
        autoCorrect={false}
        style={{ flex: 1, fontFamily: fonts.sansLight, fontSize: 16, color: colors.encre }}
      />
      {value.length > 0 ? (
        <Pressable accessibilityRole="button" accessibilityLabel={clearLabel} hitSlop={10} onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={18} color={colors.taupeClair} />
        </Pressable>
      ) : null}
    </View>
  );
}
