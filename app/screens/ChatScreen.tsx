import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatMessage from '../components/chats/ChatMessage';
import MessageInput from '../components/chats/MessageInput';
import TopPanel from '../components/TopPanel';
import { baseWS } from '../utils/ApiHandler'; // jeśli używasz zmiennej środowiskowej

type Message = {
  id?: string | number;
  message: string;
  timestamp: string;
  isSender: boolean;
  avatarUrl?: string;
};

const ChatScreen = ({ route }: any) => {
  const { user } = route.params;
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // ✅ używaj baseWS lub poprawnego IP
    const socket = new WebSocket(`${baseWS}/chat-logic/ws/${user.id}?user_id=${user.userId}`);
    ws.current = socket;
    console.log('Łączenie z WebSocketem z danymi:', {
      chatId: user.id,
      userId: user.userId,
    });

    socket.onopen = () => {
      console.log('✅ WebSocket połączony');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'previous_messages') {
        const mappedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          message: msg.content,
          timestamp: new Date(msg.sent_at).toLocaleTimeString().slice(0, 5),
          isSender: msg.sender_id === user.userId,
          avatarUrl: msg.avatar_url,
        }));
        setMessages(mappedMessages);
      } else {
        const newMsg: Message = {
          id: data.id || Date.now().toString(),
          message: data.content,
          timestamp: new Date(data.sent_at).toLocaleTimeString().slice(0, 5),
          isSender: data.sender_id === user.userId,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket błąd:', err);
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket rozłączony');
    };

    return () => {
      socket.close();
    };
  }, [user.id, user.userId]);

  const handleSend = (text: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          content: text,
          is_media: false,
        }),
      );
    } else {
      console.warn('⚠️ WebSocket nie jest połączony');
    }
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
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => <ChatMessage {...item} />}
      />

      <MessageInput onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;
