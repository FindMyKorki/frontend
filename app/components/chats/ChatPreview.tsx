import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BellOffIcon from './BellOffIcon';
import ChatHeader from './ChatHeader';
import ChatMessagePreview from './ChatMessagePreview';
import ChatMenuModal from './ChatMenuModal';
import MuteOptionsModal from './MuteOptionsModal';

export type ChatPreviewProps = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  onPress: () => void;
  onArchive: (id: string) => void;
};

const ChatPreview = ({
  id,
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount,
  onPress,
  onArchive,
}: ChatPreviewProps) => {
  const [muteOptionsVisible, setMuteOptionsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const muteChat = (chatId: string) => {
    console.log(`Wyciszam czat: ${chatId}`);
    // Tutaj można dodać rzeczywiste wywołanie API
  };

  const reportChat = (chatId: string, chatName: string) => {
    navigation.navigate('ReportChat' as never, { chatId, name: chatName } as never);
  };

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
          muteChat(id);
          setMenuVisible(false);
          setMuteOptionsVisible(true);
        }}
        onArchive={() => {
          onArchive(id);
          setMenuVisible(false);
        }}
        onReport={() => {
          setMenuVisible(false);
          reportChat(id, name);
        }}
      />

      <MuteOptionsModal visible={muteOptionsVisible} onClose={() => setMuteOptionsVisible(false)} />
    </>
  );
};

export default ChatPreview;
