import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  lastMessage: string;
  unreadCount?: number;
};

const ChatMessagePreview = ({ lastMessage, unreadCount }: Props) => (
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
);

export default ChatMessagePreview;
