import { View, Text, Image } from 'react-native';
import React from 'react';

type ChatMessageProps = {
  message: string;
  timestamp: string;
  isSender: boolean;
  avatarUrl?: string;
};

const ChatMessage = ({ message, timestamp, isSender, avatarUrl }: ChatMessageProps) => {
  return (
    <View className={`flex-row items-end mb-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar usunięty całkowicie dla !isSender */}

      <View
        className={`
          max-w-[75%] px-4 py-2 rounded-2xl
          ${
            isSender ? 'bg-primary rounded-br-none' : 'bg-white border border-black rounded-bl-none'
          }
        `}
      >
        <Text className={`text-sm ${isSender ? 'text-white' : 'text-black'}`}>{message}</Text>
        <Text className={`text-[10px] mt-1 text-right ${isSender ? 'text-white' : 'text-black'}`}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
