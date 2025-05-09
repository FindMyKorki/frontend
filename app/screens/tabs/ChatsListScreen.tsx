import { Button, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import ChatPreview from '../../components/chats/ChatPreview';
import SearchBar from '../../components/chats/SerchBar';

const ChatsListScreen = () => {
  const navigation = useNavigation();

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

  return (
    <View className="flex-1 bg-background">
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats.map((chat) => (
          <ChatPreview
            key={chat.id}
            name={chat.name}
            avatarUrl={chat.avatarUrl}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            unreadCount={chat.unreadCount}
            // @ts-ignore
            onPress={() => navigation.navigate('Chat', { user: chat })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatsListScreen;
