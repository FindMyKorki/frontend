import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import ChatHeader from './ChatHeader';
import ChatMessagePreview from './ChatMessagePreview';
import ChatMenuModal from './ChatMenuModal';
import MuteOptionsModal from './MuteOptionsModal';

export type ChatPreviewProps = {
  id: string;
  name: string;
  avatarUrl?: string;
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
  unreadCount = 0,
  onPress,
  onArchive,
}: ChatPreviewProps) => {
  const [muteOptionsVisible, setMuteOptionsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const muteChat = () => {
    console.log(`Wyciszam czat: ${id}`);
    setMenuVisible(false);
    setMuteOptionsVisible(true);
  };

  const reportChat = () => {
    // @ts-ignore
    navigation.navigate('ReportChat', { chatId: id, name });
    setMenuVisible(false);
  };

  const handleArchive = () => {
    onArchive(id);
    setMenuVisible(false);
  };

  const formattedTimestamp = dayjs(timestamp).format('DD.MM.YYYY HH:mm');
  const displayAvatar = avatarUrl || 'https://via.placeholder.com/150';

  return (
    <>
      <Pressable
        onPress={onPress}
        className="flex-row items-center p-4 bg-white border-b border-border-gray"
      >
        <Image
          source={{ uri: displayAvatar }}
          className="w-12 h-12 rounded-full bg-gray-200"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4">
          <ChatHeader name={name} timestamp={formattedTimestamp} />
          <ChatMessagePreview lastMessage={lastMessage} />
          {unreadCount > 0 && (
            <View className="mt-1 bg-red-500 rounded-full px-2 py-0.5 self-start">
              <Text className="text-white text-xs font-medium">{unreadCount}</Text>
            </View>
          )}
        </View>

        <Pressable onPress={() => setMenuVisible(true)} className="pl-3 pr-1" hitSlop={10}>
          <Entypo name="dots-three-vertical" size={20} color="#333" />
        </Pressable>
      </Pressable>

      <ChatMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onMute={muteChat}
        onArchive={handleArchive}
        onReport={reportChat}
      />

      <MuteOptionsModal visible={muteOptionsVisible} onClose={() => setMuteOptionsVisible(false)} />
    </>
  );
};

export default ChatPreview;
