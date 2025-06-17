import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatMessage from '../components/chats/ChatMessage';
import MessageInput from '../components/chats/MessageInput';
import TopPanel from '../components/TopPanel';
import { baseWS } from '../utils/ApiHandler';
import dayjs from 'dayjs';

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
      console.warn('Brakuje chatId lub userId – WebSocket nie został uruchomiony');
      return;
    }

    const wsUrl = `${baseWS}/chat-logic/ws/${chatId}?user_id=${userId}`;
    const socket = new WebSocket(wsUrl);
    ws.current = socket;

    console.log('Łączenie z WebSocketem:', { chatId, userId, wsUrl });

    socket.onopen = () => {
      console.log('WebSocket połączony');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'previous_messages') {
        const mappedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          message: msg.content,
          timestamp: dayjs(msg.sent_at).format('HH:mm'),
          isSender: msg.sender_id === userId,
          avatarUrl: msg.avatar_url,
        }));
        setMessages(mappedMessages);
      } else {
        const newMsg: Message = {
          id: data.id || Date.now().toString(),
          message:
            typeof data.content === 'string' ? data.content : '[Nieprawidłowy format wiadomości]',
          timestamp: dayjs(data.sent_at).format('HH:mm'),
          isSender: data.sender_id === userId,
        };

        // Sprawdzanie, czy wiadomość już istnieje
        setMessages((prev) => {
          if (!prev.find((msg) => msg.id === newMsg.id)) {
            return [...prev, newMsg];
          }
          return prev;
        });
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket błąd:', err);
    };

    socket.onclose = () => {
      console.log('WebSocket rozłączony');
      // Usuń tę linię:
      // socket.send(JSON.stringify({ action: 'mark_as_read', chatId }));
    };

    return () => {
      console.log('Zamykanie WebSocketu');
      // Zastąp socket.close bez niepotrzebnych komend:
      ws.current?.close();
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
      console.warn('WebSocket nie jest połączony');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopPanel
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => console.log('Opcje konwersacji')}
        name={user.name ? String(user.name) : 'Nieznany użytkownik'}
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
