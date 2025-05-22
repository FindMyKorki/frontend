import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatMessage from '../components/chats/ChatMessage';
import MessageInput from '../components/chats/MessageInput';
import TopPanel from '../components/TopPanel';
import { baseWS } from '../utils/ApiHandler';

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

  const isTutor = user?.isTutor === true;
  const chatId = user?.id;
  const userId = user?.userId;

  console.log('Czy użytkownik jest tutorem?', isTutor);

  useEffect(() => {
    if (!chatId || !userId) {
      console.warn('❌ Brakuje chatId lub userId – WebSocket nie został uruchomiony');
      return;
    }

    const wsUrl = `${baseWS}/chat-logic/ws/${chatId}?user_id=${userId}`;
    const socket = new WebSocket(wsUrl);
    ws.current = socket;

    console.log('🔗 Łączenie z WebSocketem:', { chatId, userId, wsUrl });

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
          isSender: msg.sender_id === userId,
          avatarUrl: msg.avatar_url,
        }));
        setMessages(mappedMessages);
      } else {
        const newMsg: Message = {
          id: data.id || Date.now().toString(),
          message: data.content,
          timestamp: new Date(data.sent_at).toLocaleTimeString().slice(0, 5),
          isSender: data.sender_id === userId,
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
      console.log('🧹 Zamykanie WebSocketu');
      socket.close();
    };
  }, [chatId, userId]);

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

      {isTutor && (
        <Text style={{ textAlign: 'center', padding: 8, color: 'gray' }}>
          Jesteś tutorem w tej konwersacji
        </Text>
      )}

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
