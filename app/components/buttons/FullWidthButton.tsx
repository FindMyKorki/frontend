import React from 'react';
import { Dimensions } from 'react-native';
import BaseButton from './BaseButton';

const screenWidth = Dimensions.get('window').width;
const screenPaddingHorizontal = 14;

type FullWidthButtonProps = Omit<React.ComponentProps<typeof BaseButton>, 'containerStyle'>;

const FullWidthButton = (props: FullWidthButtonProps) => {
  return (
    <BaseButton
      {...props}
      containerStyle={{
        width: screenWidth - 2 * screenPaddingHorizontal,
        paddingVertical: 12,
        borderRadius: 7,
      }}
    />
  );
};

export default FullWidthButton;
