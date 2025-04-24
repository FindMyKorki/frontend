import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type TopPanelProps = {
  onBackPress: () => void;
  onSettingsPress?: () => void;
  tutorName?: string;
  tutorImage?: string;
  className?: string;
  centerContentClassName?: string;
};

const TopPanel = ({
  onBackPress,
  onSettingsPress,
  tutorName,
  tutorImage,
  className = '',
  centerContentClassName = '',
}: TopPanelProps) => {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-2.5 bg-[#F1F1F1] border-b border-[#D9D9D9] border-b-[1px] ${className}`}
    >
      {/* Strzałka (zawsze widoczna) */}
      <Pressable onPress={onBackPress} className="p-1">
        <MaterialIcons name="arrow-back" size={24} color="#1A5100" />
      </Pressable>

      {/* Środek (tylko jeśli tutorName i tutorImage są podane) */}
      {tutorName && tutorImage && (
        <View className={`flex-1 flex-row items-center ${centerContentClassName}`}>
          <Image
            source={{ uri: tutorImage }}
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
          />
          <Text className="ml-2 font-semibold text-base text-[#1A5100]">{tutorName}</Text>
        </View>
      )}

      {/* Ikona ustawień (pokazywana tylko jeśli przekazano onSettingsPress) */}
      {onSettingsPress && (
        <Pressable onPress={onSettingsPress} className="p-1">
          <MaterialIcons name="more-vert" size={24} color="#1A5100" />
        </Pressable>
      )}
    </View>
  );
};

export default TopPanel;
