import React from 'react';
import { View, ViewProps } from 'react-native';
import AppButton, { type ButtonProps } from './AppButton';

type BottomPanelButtonsProps = {
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
} & ViewProps;

const BottomPanelButtons = ({
  leftButtonProps,
  rightButtonProps,
  ...rest
}: BottomPanelButtonsProps) => {
  return (
    <View className="flex-row gap-2 px-3.5 py-2.5 bg-white shadow-md" {...rest}>
      {leftButtonProps && <AppButton size="full" {...leftButtonProps} />}
      {rightButtonProps && <AppButton size="full" appearance="outlined" {...rightButtonProps} />}
    </View>
  );
};

export default BottomPanelButtons;
