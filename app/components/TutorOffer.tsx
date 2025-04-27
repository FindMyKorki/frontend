import { FC } from 'react';
import { View, Text } from 'react-native';
import Buttonq from './AppButton';
import { twMerge } from 'tailwind-merge';

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
        `bg-white border-[2px] border-[#D9D9D9] px-5 py-3.5 rounded-md flex-row justify-between items-center`,
        className,
      )}
    >
      <View className="flex-1">
        <Text className="text-[14px] font-bold text-left font-['Inter']  uppercase">{subject}</Text>
        <Text className="text-[12px] font-medium text-left font-['Inter'] mb-1">
          {educationLevel}
        </Text>
        {userType === 'tutor' && (
          <Text className="text-[12px] font-bold text-left font-['Inter'] mb-1">{price}</Text>
        )}
        <Text className="text-[12px] font-normal text-left font-['Inter'] mb-1 flex-1 max-w-[80%]">
          {description}
        </Text>
      </View>

      <View className="flex flex-col items-end justify-center ml-4">
        {userType === 'student' ? (
          <View className="flex flex-col items-center">
            <Text className="text-[14px] font-bold font-['Inter'] mb-2">{price}</Text>
            <Buttonq
              label="Umów"
              onPress={() => {}}
              size="auto"
              textClassName="text-[14px] font-semibold font-['Inter']"
              className={twMerge(buttonWrapperClassName.replace(/mb-\d+/g, ''), 'mb-0')}
            />
          </View>
        ) : (
          <View className="flex flex-col items-end">
            <Buttonq
              label="Edytuj"
              onPress={() => {}}
              size="auto"
              className={twMerge(buttonWrapperClassName)}
              textClassName="text-[14px] font-semibold font-['Inter']"
            />
            <Buttonq
              label=" Usuń "
              onPress={() => {}}
              size="auto"
              outlined
              className={twMerge(buttonWrapperClassName.replace(/mb-\d+/g, ''), 'mb-0')}
              textClassName="text-[14px] font-semibold font-['Inter']"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TutorOffer;
