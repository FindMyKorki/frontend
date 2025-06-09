import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type MessageInputProps = {
  onSend: (text: string) => void;
};

const SendIcon = ({ width = 24, height = 24 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#2E4E1E" />
  </Svg>
);

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mx-4 mb-4 bg-white">
      <TextInput
        placeholder="Napisz wiadomość..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        multiline={true}
        returnKeyType="send"
        className="flex-1 text-base px-4 py-2 text-black"
        accessibilityLabel="Pole wiadomości"
      />

      {/* Przycisk wysyłania */}
      <Pressable
        onPress={handleSend}
        disabled={!text.trim()}
        accessibilityLabel="Wyślij wiadomość"
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          width: 24,
          height: 23,
          opacity: text.trim() ? 1 : 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SendIcon width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default MessageInput;
