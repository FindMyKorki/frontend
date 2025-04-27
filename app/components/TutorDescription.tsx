import { FC } from 'react';
import { View, Text } from 'react-native';

type TutorDescriptionProps = {
  title?: string;
  className?: string;
  description: string;
};

const TutorDescription: FC<TutorDescriptionProps> = ({
  title = 'opis',
  className,
  description,
}) => {
  return (
    <View className={`items-center ${className}`}>
      <Text className="text-[12px] text-primary mb-[10px] font-['Inter']">{title}</Text>
      <View className="bg-background-alt rounded-[7px] py-[10px] px-[14px]">
        <Text className="text-[14px] text-text-dark font-['Inter']">{description}</Text>
      </View>
    </View>
  );
};

export default TutorDescription;
