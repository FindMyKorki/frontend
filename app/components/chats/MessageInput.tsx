import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import Send from '../assets/';

type MessageInputProps = {
  onSend: (text: string) => void;
};
const SendIcon = ({ width = 24, height = 24 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#2E4E1E" />
  </Svg>
);

const GalleryIcon = ({ width = 19, height = 19 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
    <Path
      d="M16 5V7.99C16 7.99 14.01 8 14 7.99V5H11C11 5 11.01 3.01 11 3H14V0H16V3H19V5H16ZM13 9V6H10V3H2C0.9 3 0 3.9 0 5V17C0 18.1 0.9 19 2 19H14C15.1 19 16 18.1 16 17V9H13ZM2 17L5 13L7 16L10 12L14 17H2Z"
      fill="#1A5100"
    />
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
      <Pressable
        onPress={handleSend}
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          width: 24,
          height: 23,
        }}
      >
        {' '}
        <GalleryIcon />
      </Pressable>
      <TextInput
        placeholder="Napisz wiadomość..."
        value={text}
        onChangeText={setText}
        className="flex-1 text-base px-4 py-2 text-black"
      />

      <Pressable
        onPress={handleSend}
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          width: 24,
          height: 23,
        }}
      >
        <SendIcon width={24} height={24} />
      </Pressable>
    </View>
  );
};

export default MessageInput;
