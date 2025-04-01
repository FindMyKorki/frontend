import { FC } from 'react';
import { View, Text } from 'react-native';

type ReusableExampleComponentType = {
  exampleProp: string;
  className?: string;
};

const ReusableExampleComponent: FC<ReusableExampleComponentType> = ({ exampleProp, className }) => {
  return (
    <View className={`bg-primary p-10 ${className}`}>
      <Text className={`text-white`}>{exampleProp}</Text>
    </View>
  );
};

export default ReusableExampleComponent;
