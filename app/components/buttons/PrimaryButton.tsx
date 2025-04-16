import React from 'react';
import BaseButton from './BaseButton';

type PrimaryButtonProps = Omit<React.ComponentProps<typeof BaseButton>, 'containerStyle'>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <BaseButton
      {...props}
      containerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
      }}
    />
  );
};

export default PrimaryButton;
