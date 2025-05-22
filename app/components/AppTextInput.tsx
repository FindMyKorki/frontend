import React, { FC } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

type AppTextInputProps = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  inputHeightClass?: string;
};

const AppTextInput: FC<AppTextInputProps> = ({
  value,
  setValue,
  placeholder = '',
  label,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  inputHeightClass = '',
}) => {
  return (
    <View className="gap-y-1">
      <Text className="font-medium text-text-dark">{label}</Text>
      <TextInput
        className={`text-text-dark border border-border-gray rounded-lg px-3 py-2 bg-background ${inputHeightClass}`}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical="top"
      />
    </View>
  );
};

export default AppTextInput;
