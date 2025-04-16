import React from 'react';
import { Dimensions } from 'react-native';
import BaseButton from './BaseButton';

const screenWidth = Dimensions.get('window').width;
const screenPaddingHorizontal = 14;
const buttonSpacing = 12;
const buttonWidth = (screenWidth - 2 * screenPaddingHorizontal - buttonSpacing) / 2;

type BottomPanelButtonProps = Omit<React.ComponentProps<typeof BaseButton>, 'containerStyle'>;

const BottomPanelButton = (props: BottomPanelButtonProps) => {
  return (
    <BaseButton
      {...props}
      containerStyle={{
        width: buttonWidth,
        paddingVertical: 10,
        borderRadius: 7,
      }}
    />
  );
};

export default BottomPanelButton;
