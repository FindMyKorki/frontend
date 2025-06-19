import { FC } from 'react';
import { View, Text } from 'react-native';
import Button from './AppButton';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export type TutorOfferProps = {
  subject: string;
  educationLevel: string;
  price: string;
  description: string;
  userType: 'student' | 'tutor';
  className?: string;
  buttonWrapperClassName?: string;
};

const TutorOffer: FC<TutorOfferProps> = ({
  subject,
  educationLevel,
  price,
  description,
  userType,
  className = '',
  buttonWrapperClassName = 'px-4 py-1 mb-1',
}) => {
  return (
    <View
      className={twMerge(
        'bg-white border-2 border-border-gray px-5 py-3.5 rounded-md flex-row justify-between items-center',
        className,
      )}
    >
      <View className="flex-1">
        <Text className="text-sm font-bold text-left font-inter uppercase">{subject}</Text>
        <Text className="text-xs font-medium text-left font-inter mb-1">{educationLevel}</Text>
        {userType === 'tutor' && (
          <Text className="text-xs font-bold text-left font-inter mb-1">{price} zł</Text>
        )}
        <Text className="text-xs font-normal text-left font-inter mb-1 flex-1 max-w-[65%]">
          {description}
        </Text>
      </View>

      <View className="flex flex-col items-end justify-center ml-4">
        {userType === 'student' ? (
          <View className="flex flex-col items-center">
            <Text className="text-sm font-bold font-inter mb-2">{price} zł</Text>
            <Button
              label="Umów"
              onPress={() => {}}
              size="auto"
              className={twMerge(buttonWrapperClassName.replace(/mb-\d+/g, ''), 'mb-0')}
            />
          </View>
        ) : (
          <View className="flex flex-col items-end">
            <Button
              label="Edytuj"
              onPress={() => {}}
              size="auto"
              className={twMerge(buttonWrapperClassName)}
            />
            <Button
              label=" Usuń "
              onPress={() => {}}
              size="auto"
              appearance="outlined"
              className={twMerge(buttonWrapperClassName.replace(/mb-\d+/g, ''), 'mb-0')}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TutorOffer;
