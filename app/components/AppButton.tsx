import React from 'react';
import { Pressable, Text, View, ActivityIndicator } from 'react-native';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex-row items-center justify-center box-border',
  variants: {
    size: {
      auto: 'self-start px-2.5 py-[5px] rounded',
      full: 'w-full px-5 py-2.5 rounded-lg',
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
    appearance: 'filled',
    disabled: false,
  },
});

export type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: React.ReactNode; // left icon
  rightIcon?: React.ReactNode; // right icon
  disabled?: boolean;
  appearance?: 'filled' | 'outlined' | 'transparent';
  size?: 'auto' | 'full';
  className?: string;
  textClassName?: string;
  loading?: boolean;
};

const Button = ({
  label,
  onPress,
  icon,
  rightIcon,
  disabled = false,
  appearance = 'filled',
  size = 'auto',
  className = '',
  textClassName = '',
  loading = false,
}: ButtonProps) => {
  const finalButtonClass = button({ appearance, size, disabled }) + ' ' + className;

  const textColor = ['outlined', 'transparent'].includes(appearance)
    ? 'text-primary'
    : 'text-white';
  const isFullSize = size === 'full';
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
      {loading ? (
        <ActivityIndicator color={'#FFFFFF'} size={'small'} />
      ) : (
        <>
          {icon && <Text className="mx-3">{icon}</Text>}
          <Text className={finalTextClass.trim()}>{label}</Text>
          {rightIcon && <Text className="ml-1">{rightIcon}</Text>}
        </>
      )}
    </Pressable>
  );
};

export default Button;
