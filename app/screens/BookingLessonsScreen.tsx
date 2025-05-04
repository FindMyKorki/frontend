import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import LessonDetails from '../components/LessonDetails';
import { MaterialIcons } from '@expo/vector-icons';

type LessonDetailsScreenProps = {
  onBackPress?: () => void;
  teacher: string;
  subject: string;
  level: string;
  price: string;
  startTime: Date;
  endTime: Date;
  description: string;
};

const LessonDetailsScreen: FC<LessonDetailsScreenProps> = ({
  onBackPress,
  teacher,
  subject,
  level,
  price,
  startTime,
  endTime,
  description,
}) => {
  return (
    <View className="bg-background flex-1">
      {/* Header */}
      <View className="flex-row px-4 py-3">
        <TouchableOpacity onPress={onBackPress} className="pr-3">
          <MaterialIcons name="arrow-back" size={24} color="#1A5100" />
        </TouchableOpacity>

        <Text className="text-lg text-text-dark font-[Inter]">Podaj szczegóły lekcji</Text>
      </View>

      {/* Lesson Card */}
      <LessonDetails
        teacher={teacher}
        subject={subject}
        level={level}
        price={price}
        startTime={startTime}
        endTime={endTime}
        description={description}
        className="px-4 py-3"
      />

      <View className="px-4">
        {/* Topic Input */}
        <View className="py-3">
          <Text className="text-base text-text-dark font-bold mb-2.5 font-[Inter]">
            Temat zajęć
          </Text>

          <TextInput className="border border-border-gray rounded-xl" />
        </View>

        {/* Attachments */}
        <View className="py-3 my-5">
          <View className="mb-2.5 flex-row">
            <Text className="text-base text-text-dark font-bold font-[Inter]">
              Załącz materiały
            </Text>
            <Text className="ml-auto text-base text-text-light self-center font-[Inter]">
              2 załączniki
            </Text>
          </View>

          <View className="flex-row">
            <TouchableOpacity className="bg-background border border-background-alt rounded-md px-6 py-3 mr-2.5">
              <Text className="font-[Inter] text-base text-text-dark">Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-background border border-background-alt rounded-md px-6 py-3">
              <Text className="font-[Inter] text-base text-text-dark">Aparat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between px-4 py-3 absolute bottom-0 left-0 right-0">
        <TouchableOpacity
          className="flex-1 bg-background border border-primary rounded-lg py-2.5 px-11 mr-2"
          onPress={onBackPress}
        >
          <Text className="text-center font-bold font-[Inter] text-text-dark">Wróć</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2.5 px-11 ml-2">
          <Text className="text-center font-bold font-[Inter] text-background">Umów</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LessonDetailsScreen;
