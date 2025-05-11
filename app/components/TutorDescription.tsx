import React from 'react';
import { FC } from 'react';
import { View, Text } from 'react-native';

type TutorDescriptionProps = {
  className?: string;
  description: string;
};

const TutorDescription: FC<TutorDescriptionProps> = ({ className, description }) => {
  return (
    <View className={`items-center ${className}`}>
      <View className="bg-background-alt rounded-lg py-3 px-4">
        <Text className="text-base text-text-dark font-['Inter']">{description}</Text>
      </View>
    </View>
  );
};

export default TutorDescription;
