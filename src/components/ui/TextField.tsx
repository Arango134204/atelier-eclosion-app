import { useState, type Ref } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fonts } from '@/theme/colors';

interface TextFieldProps extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  label: string;
  error?: string;
  hint?: string;
  ref?: Ref<TextInput>;
}

/** Campo subrayado: la línea se oscurece al enfocar y se vuelve roja con un mensaje si hay error. */
export function TextField({ label, error, hint, multiline, onFocus, onBlur, ref, ...inputProps }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const lineClass = error ? 'border-b-[1.5px] border-erreur' : focused ? 'border-b-[1.5px] border-encre' : 'border-b border-grege';

  return (
    <View className="gap-2">
      <Text className={`font-sans-medium text-[11px] uppercase tracking-[2px] ${error ? 'text-erreur' : 'text-taupe'}`}>
        {label}
      </Text>
      <View className={`py-2 ${lineClass}`}>
        <TextInput
          {...inputProps}
          ref={ref}
          multiline={multiline}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          placeholderTextColor={colors.taupeClair}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={{
            fontFamily: fonts.sansLight,
            fontSize: 16,
            color: colors.encre,
            minHeight: multiline ? 88 : undefined,
            textAlignVertical: multiline ? 'top' : 'center',
            padding: 0,
          }}
        />
      </View>
      {error ? (
        <Text className="font-sans text-xs text-erreur">{error}</Text>
      ) : hint ? (
        <Text className="font-sans text-xs text-taupe-clair">{hint}</Text>
      ) : null}
    </View>
  );
}
