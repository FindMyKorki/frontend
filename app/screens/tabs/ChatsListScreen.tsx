import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Chat: {
    user: {
      id: number;
      name: string;
      avatarUrl?: string;
      lastMessage: string;
      timestamp: string;
      unreadCount?: number;
      userId: string | null;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
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
  const navigation = useNavigation<NavigationProp>();
  const [archivedChatIds, setArchivedChatIds] = useState<number[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibleChats = chats.filter((chat) => !archivedChatIds.includes(chat.id));

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
      setCurrentUserId(user.id);

      // Pobierz czaty
      const fetchedChatsRaw = await apiCall<any[]>({
        method: 'GET',
        url: endpoint,
      });

      const mappedChats: Chat[] = fetchedChatsRaw.map((chat) => ({
        id: chat.id,
        name:
          chat.student?.full_name ||
          chat.tutor?.full_name ||
          chat.student_name ||
          chat.tutor_name ||
          'Nieznany użytkownik',
        avatarUrl: chat.student?.avatar_url || chat.tutor?.avatar_url || chat.avatar_url,
        lastMessage: chat.last_message?.content || chat.last_message || 'Brak wiadomości',
        timestamp: chat.last_message?.sent_at || chat.sent_at || '',
        unreadCount: chat.unread_count || 0,
      }));

      setChats(mappedChats);
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
          {visibleChats.length === 0 ? (
            <View className="items-center justify-center mt-10 px-4">
              <Text className="text-lg text-muted-foreground text-center">
                Brak konwersacji do wyświetlenia.
              </Text>
              <Text className="text-sm text-gray-400 text-center mt-2">
                Gdy rozpoczniesz rozmowę z uczniem lub tutorem, pojawi się tutaj.
              </Text>
            </View>
          ) : (
            visibleChats.map((chat, index) => (
              <ChatPreview
                key={`${chat.id}-${index}`}
                id={String(chat.id)}
                name={chat.name}
                avatarUrl={chat.avatarUrl}
                lastMessage={chat.lastMessage}
                timestamp={chat.timestamp}
                unreadCount={chat.unreadCount}
                onPress={() =>
                  navigation.navigate('Chat', {
                    user: {
                      ...chat,
                      userId: currentUserId,
                    },
                  })
                }
                onArchive={() => handleArchiveChat(chat.id)}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ChatsListScreen;
