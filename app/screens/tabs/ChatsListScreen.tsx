import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChatPreview from '../../components/chats/ChatPreview';
import SearchBar from '../../components/chats/SerchBar';
import { apiCall } from '../../utils/ApiHandler';

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
      isTutor: boolean;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
  const [isTutor, setIsTutor] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const visibleChats = chats.filter((chat) => !archivedChatIds.includes(chat.id));

  const fetchChats = async () => {
    setLoading(true);
    setError(null);

    try {
      // Pobranie informacji o użytkowniku
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

      const tutorFlag = user.profile.is_tutor;
      const endpoint = tutorFlag ? '/chats/tutor' : '/chats/student';

      setCurrentUserId(user.id);
      setIsTutor(tutorFlag);

      // Pobranie czatów na podstawie roli użytkownika
      const fetchedChatsRaw = await apiCall<any[]>({
        method: 'GET',
        url: endpoint,
      });
      console.log('🛠️ Odebrane dane z backendu:', fetchedChatsRaw);

      // Mapowanie danych różni się w zależności od roli
      const mappedChats: Chat[] = tutorFlag
        ? fetchedChatsRaw.map((chat) => ({
            id: chat.chat_id, // Używamy "chat_id" dla tutora
            name: chat.their_full_name,
            avatarUrl: chat.their_avatar_url || null,
            lastMessage: chat.last_message_content || 'Brak wiadomości',
            timestamp: chat.last_message_sent_at || '', // Czas ostatniej wiadomości
            unreadCount: chat.last_message_is_read ? 0 : 1, // Jeśli wiadomość nieprzeczytana
          }))
        : fetchedChatsRaw.map((chatString) => {
            // Jeśli dane to string, przekształcamy je w odpowiedni obiekt lub logujemy błąd
            const chat = JSON.parse(chatString); // Jeśli to JSON w stringu, parsujemy
            return {
              id: chat.chat_id || Date.now(), // Losowe ID w razie błędów
              name: chat.their_full_name || 'Nieznany użytkownik',
              avatarUrl: chat.their_avatar_url || null,
              lastMessage: chat.last_message_content || 'Brak wiadomości',
              timestamp: chat.last_message_sent_at || '',
              unreadCount: 0, // Brak informacji o liczniku
            };
          });

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
      <SearchBar currentUserId={currentUserId} isTutor={isTutor} />

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
            visibleChats.map((chat, index) => {
              console.log('Przygotowywany chat:', chat);
              console.log('Aktualny userId:', currentUserId);
              console.log('Czy tutor:', isTutor);

              return (
                <ChatPreview
                  key={`${chat.id}-${index}`}
                  id={String(chat.id)}
                  name={chat.name}
                  avatarUrl={chat.avatarUrl}
                  lastMessage={chat.lastMessage}
                  timestamp={chat.timestamp}
                  unreadCount={chat.unreadCount}
                  onPress={() => {
                    if (!chat.id || !currentUserId) {
                      console.warn('⛔ Nie można otworzyć chatu — brak ID');
                      return;
                    }

                    navigation.navigate('Chat', {
                      user: {
                        ...chat,
                        userId: currentUserId,
                        isTutor,
                      },
                    });
                  }}
                  onArchive={() => handleArchiveChat(chat.id)}
                />
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ChatsListScreen;
