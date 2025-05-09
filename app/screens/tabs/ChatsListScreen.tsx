import { Button, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import ChatPreview from '../../components/chats/ChatPreview';
import SearchBar from '../../components/chats/SerchBar';

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const [archivedChatIds, setArchivedChatIds] = useState<string[]>([]);

  const chats = [
    {
      id: '1',
      name: 'Jan Kowalski',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastMessage: 'Do zobaczenia na zajęciach!',
      timestamp: '14:30',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '3',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '4',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '5',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '6',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '7',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '8',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '9',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '10',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '11',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '12',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
    {
      id: '13',
      name: 'Anna Nowak',
      avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
      lastMessage: 'Dziękuję za ostatnie zajęcia',
      timestamp: 'Wczoraj',
    },
  ];

  const handleArchiveChat = (chatId: string) => {
    setArchivedChatIds((prev) => [...prev, chatId]);
  };

  return (
    <View className="flex-1 bg-background">
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats
          .filter((chat) => !archivedChatIds.includes(chat.id))
          .map((chat) => (
            <ChatPreview
              key={chat.id}
              id={chat.id}
              name={chat.name}
              avatarUrl={chat.avatarUrl}
              lastMessage={chat.lastMessage}
              timestamp={chat.timestamp}
              unreadCount={chat.unreadCount}
              onPress={() => navigation.navigate('Chat', { user: chat })}
              onArchive={handleArchiveChat}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default ChatsListScreen;
