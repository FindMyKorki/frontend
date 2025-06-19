import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { format, differenceInMinutes, differenceInHours } from 'date-fns';

type Offer = {
  price: number;
  subject_name: string;
  description: string;
  level: string;
  tutor_full_name: string;
};

type LessonDetailsProps = {
  className?: string;
  offer: Offer;
  startTime: Date | null;
  endTime: Date | null;
};

const LessonDetails: FC<LessonDetailsProps> = ({
  className = '',
  offer,
  startTime = null,
  endTime = null,
}) => {
  let differenceH = 0;
  let differenceM = 0;
  if (startTime && endTime) {
    differenceH = differenceInHours(endTime, startTime);
    differenceM = differenceInMinutes(endTime, startTime) % 60;
  }
  const price = startTime && endTime ? (differenceH + differenceM / 60) * offer.price : 0;

  const duration = `${differenceH !== 0 ? `${differenceH}h` : ''}${differenceH !== 0 && differenceM === 0 ? '' : ` ${differenceM}min`}`;

  return (
    <View className={className}>
      <View className="bg-background-alt rounded-lg px-6 py-3">
        <View className="flex-row justify-between">
          <View className="justify-between items-start">
            <Text className="font-bold text-text-dark text-base font-[Inter] pb-1">{`Lekcja z ${offer.tutor_full_name}`}</Text>
            <Text className="font-medium text-text-dark text-sm font-[Inter] pb-1">{`Przedmiot: ${offer.subject_name}`}</Text>
            <Text className="font-medium text-text-dark text-sm font-[Inter]">{`Poziom: ${offer.level}`}</Text>
          </View>

          <View className="justify-between items-end">
            <Text className="font-bold text-text-dark text-xl font-[Inter] pb-1">{`${parseFloat(price.toFixed(2))} zł`}</Text>
            <Text className="font-semibold text-text-light text-sm font-[Inter] pb-1">{`${startTime == null ? '00:00' : format(startTime, 'HH:mm')} - ${endTime == null ? '00:00' : format(endTime, 'HH:mm')}`}</Text>
            <Text className="font-semibold text-text-light text-sm font-[Inter]">{duration}</Text>
          </View>
        </View>

        <View className="border-t border-border-gray mt-2 pt-2" />

        <View>
          <Text className="text-sm text-text-dark font-[Inter]">{offer.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default LessonDetails;
