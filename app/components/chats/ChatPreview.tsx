import React, { useState } from 'react';
import { View, Text, Image, Pressable, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import BellOffIcon from './BellOffIcon';
import ChatHeader from './ChatHeader';
import ChatMessagePreview from './ChatMessagePreview';
import ChatMenuModal from './ChatMenuModal';
import MuteOptionsModal from './MuteOptionsModal';

export type ChatPreviewProps = {
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
  const [muteOptionsVisible, setMuteOptionsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={onPress}
        className="flex-row items-center p-4 bg-white border-b border-border-gray"
      >
        <Image source={{ uri: avatarUrl }} className="w-12 h-12 rounded-full" />

        <View className="flex-1 ml-4">
          <ChatHeader name={name} timestamp={timestamp} />
          <ChatMessagePreview lastMessage={lastMessage} unreadCount={unreadCount} />
        </View>

        <Pressable onPress={() => setMenuVisible(true)} className="pl-3 pr-1" hitSlop={10}>
          <Entypo name="dots-three-vertical" size={20} color="#333" />
        </Pressable>
      </Pressable>

      <ChatMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onMute={() => {
          setMenuVisible(false);
          setMuteOptionsVisible(true);
        }}
      />

      <MuteOptionsModal visible={muteOptionsVisible} onClose={() => setMuteOptionsVisible(false)} />
    </>
  );
};

export default ChatPreview;
