import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { format, differenceInMinutes, differenceInHours } from 'date-fns';

type LessonCardProps = {
  className?: string;
  teacher: string;
  subject: string;
  level: string;
  price: string;
  startTime: Date;
  endTime: Date;
  description: string;
};

const LessonCard: FC<LessonCardProps> = ({
  className = '',
  teacher,
  subject,
  level,
  price,
  startTime,
  endTime,
  description,
}) => {
  const differenceH = differenceInHours(endTime, startTime);
  const differenceM = differenceInMinutes(endTime, startTime) % 60;

  const duration = `${differenceH !== 0 ? `${differenceH}h` : ''}${differenceH !== 0 && differenceM === 0 ? '' : ` ${differenceM}min`}`;

  return (
    <View className={className}>
      <View className="bg-background-alt rounded-lg px-6 py-3">
        <View className="flex-row justify-between">
          <View className="justify-between items-start">
            <Text className="font-bold text-text-dark text-base font-[Inter] pb-1">{`Lekcja z ${teacher}`}</Text>
            <Text className="font-medium text-text-dark text-sm font-[Inter] pb-1">{`Przedmiot: ${subject}`}</Text>
            <Text className="font-medium text-text-dark text-sm font-[Inter]">{`Poziom: ${level}`}</Text>
          </View>

          <View className="justify-between items-end">
            <Text className="font-bold text-text-dark text-xl font-[Inter] pb-1">{`${price} zł`}</Text>
            <Text className="font-semibold text-text-light text-sm font-[Inter] pb-1">{`${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`}</Text>
            <Text className="font-semibold text-text-light text-sm font-[Inter]">{duration}</Text>
          </View>
        </View>

        <View className="border-t border-border-gray mt-2 pt-2" />

        <View>
          <Text className="text-sm text-text-dark font-[Inter]">{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default LessonCard;
