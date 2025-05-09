import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatMessage from '../components/chats/ChatMessage';
import MessageInput from '../components/chats/MessageInput';
import TopPanel from '../components/TopPanel';

const ChatScreen = ({ route }: any) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: 'Hej, jak się masz?',
      timestamp: '12:30',
      isSender: false,
      avatarUrl: 'https://placekitten.com/100/100',
    },
    {
      id: '2',
      message: 'Wszystko super!',
      timestamp: '12:32',
      isSender: true,
    },
  ]);

  const handleSend = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message: text,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
      isSender: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <View style={{ flex: 1 }}>
      <TopPanel
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => console.log('Opcje konwersacji')}
        name={String(user.name)}
        image={user.avatarUrl}
      />

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage {...item} />}
      />
      <MessageInput onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;
