import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import FiltersScreen from '../../screens/FiltersScreen';

type ChatPreviewProps = {
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  onPress: () => void;
};

const ChatPreview = ({
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount,
  onPress,
}: ChatPreviewProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center p-4 bg-white border-b border-border-gray"
    >
      <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full text-left" />

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between">
          <Text className="text-base font-bold text-text-dark">{name}</Text>
          <Text className="text-xs text-text-light">{timestamp}</Text>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text numberOfLines={1} className="flex-1 text-sm text-text-medium">
            {lastMessage}
          </Text>
          {unreadCount ? (
            <View className="bg-primary rounded-full w-5 h-5 items-center justify-center ml-2">
              <Text className="text-xs text-white font-bold">{unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatPreview;
