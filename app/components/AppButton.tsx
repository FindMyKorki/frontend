import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex-row items-center justify-center box-border',
  variants: {
    size: {
      auto: 'self-start px-2.5 py-[5px] rounded',
      full: 'flex-1 px-5 py-2.5 rounded-lg',
    },
    appearance: {
      filled: 'border border-transparent bg-primary',
      outlined: 'border border-primary bg-transparent',
      transparent: 'border-transparent',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'auto',
    type: 'filled',
    disabled: false,
  },
});

export type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  appearance?: 'filled' | 'outlined' | 'transparent';
  size?: 'auto' | 'full';
  className?: string;
  textClassName?: string;
};

const Button = ({
  label,
  onPress,
  icon,
  disabled = false,
  appearance = 'filled',
  size = 'auto',
  className = '',
  textClassName = '',
}: ButtonProps) => {
  const finalButtonClass = button({ appearance, disabled, size }) + ' ' + className;

  const textColor = ['outlined', 'transparent'].includes(appearance)
    ? 'text-primary'
    : 'text-white';
  const isFullSize = size == 'full';
  const fontWeight = isFullSize ? 'font-bold' : 'font-semibold';
  const finalTextClass = `text-sm ${fontWeight} ${textColor} ${textClassName}`;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      className={finalButtonClass.trim()}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text className={finalTextClass.trim()}>{label}</Text>
    </Pressable>
  );
};

export default Button;
