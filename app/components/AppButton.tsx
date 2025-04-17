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
    outlined: {
      true: 'border border-primary bg-transparent',
      false: 'border border-transparent bg-primary',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'auto',
    outlined: false,
    disabled: false,
  },
});

type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  outlined?: boolean;
  size?: 'auto' | 'full';
  className?: string;
  textClassName?: string;
};

const Button = ({
  label,
  onPress,
  icon,
  disabled = false,
  outlined = false,
  size = 'auto',
  className = '',
  textClassName = '',
}: ButtonProps) => {
  const finalButtonClass = button({ outlined, disabled, size }) + ' ' + className;

  const textColor = outlined ? 'text-primary' : 'text-white';
  const finalTextClass = `text-sm font-semibold ${textColor} ${textClassName}`;

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
