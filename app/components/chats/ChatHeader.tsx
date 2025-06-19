import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  name: string;
  timestamp: string;
};

const ChatHeader = ({ name, timestamp }: Props) => (
  <View className="flex-row justify-between">
    <Text className="text-base font-bold text-text-dark">{name}</Text>
    <Text className="text-xs text-text-light">{timestamp}</Text>
  </View>
);
export default ChatHeader;
