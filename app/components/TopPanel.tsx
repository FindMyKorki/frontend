import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type TopPanelProps = {
  onBackPress: () => void;
  onSettingsPress?: () => void;
  name?: string;
  image?: string;
  className?: string;
  centerContentClassName?: string;
};

const TopPanel = ({
  onBackPress,
  onSettingsPress,
  name,
  image,
  className = '',
  centerContentClassName = '',
}: TopPanelProps) => {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-2.5 bg-background ${className}`}
    >
      <Pressable onPress={onBackPress} className="p-1">
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>

      {(name || image) && (
        <View className={`flex-1 flex-row items-center ${centerContentClassName}`}>
          {image && (
            <Image source={{ uri: image }} className="w-10 h-10 rounded-full" resizeMode="cover" />
          )}
          {name && (
            <Text className={`ml-2 font-semibold text-base text-text-dark ${!image && 'ml-0'}`}>
              {name}
            </Text>
          )}
        </View>
      )}

      {onSettingsPress && (
        <Pressable onPress={onSettingsPress} className="p-1">
          <MaterialIcons name="more-vert" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
};

export default TopPanel;
