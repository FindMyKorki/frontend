import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import ChatPreview from '../../components/chats/ChatPreview';
import SearchBar from '../../components/chats/SerchBar';
import { apiCall } from '../../utils/ApiHandler';

type Chat = {
  id: number;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
};

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const [archivedChatIds, setArchivedChatIds] = useState<number[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);
    try {
      // Pobierz dane użytkownika
      const user = await apiCall<{
        id: string;
        profile: {
          full_name: string;
          avatar_url: string;
          is_tutor: boolean;
        };
      }>({
        method: 'GET',
        url: '/user',
      });

      const isTutor = user.profile.is_tutor;
      const endpoint = isTutor ? '/chats/tutor' : '/chats/student';

      const fetchedChats = await apiCall<Chat[]>({
        method: 'GET',
        url: endpoint,
      });

      setChats(fetchedChats);
    } catch (err: any) {
      console.error('Błąd ładowania czatów:', err.message);
      setError('Nie udało się załadować czatów.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleArchiveChat = (chatId: number) => {
    setArchivedChatIds((prev) => [...prev, chatId]);
  };

  return (
    <View className="flex-1 bg-background">
      <SearchBar />

      {loading ? (
        <ActivityIndicator size="large" className="mt-4" />
      ) : error ? (
        <Text className="text-red-500 text-center mt-4">{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {chats
            .filter((chat) => !archivedChatIds.includes(chat.id))
            .map((chat, index) => (
              <ChatPreview
                key={`${chat.id}-${index}`}
                id={String(chat.id)}
                name={chat.name}
                avatarUrl={chat.avatarUrl || undefined}
                lastMessage={chat.lastMessage}
                timestamp={chat.timestamp}
                unreadCount={chat.unreadCount}
                onPress={() => navigation.navigate('Chat', { user: chat })}
                onArchive={() => handleArchiveChat(chat.id)}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ChatsListScreen;
