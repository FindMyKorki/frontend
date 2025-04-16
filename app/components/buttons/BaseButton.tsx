import React from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BaseButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  outlined?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const BaseButton = ({
  label,
  onPress,
  icon,
  outlined = false,
  disabled = false,
  backgroundColor = '#1A5100',
  textColor = '#FFFFFF',
  borderColor,
  containerStyle,
}: BaseButtonProps) => {
  const finalBorderColor = borderColor || backgroundColor;
  const finalTextColor = outlined ? finalBorderColor : textColor;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: outlined ? 'transparent' : backgroundColor,
          borderWidth: outlined ? 1 : 0,
          borderColor: finalBorderColor,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color: finalTextColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
  icon: {
    marginRight: 6,
  },
});

export default BaseButton;
