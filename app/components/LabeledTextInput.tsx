import React, { FC } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface LabeledTextInputProps extends TextInputProps {
  label: string;
  className?: string;
  inputClassName?: string;
}

const LabeledTextInput: FC<LabeledTextInputProps> = ({
  label,
  className = '',
  inputClassName = '',
  ...props
}) => {
  return (
    <View className={className}>
      <Text className="text-base mb-1 font-bold">{label}</Text>
      <TextInput
        className={`py-2 px-4 border border-gray-300 rounded-lg text-base ${inputClassName}`}
        {...props}
      />
    </View>
  );
};

export default LabeledTextInput;
