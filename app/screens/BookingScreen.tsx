import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Booking from '../components/Booking';
import { apiCall } from '../utils/ApiHandler';

type BookingT = {
  id: number;
  offer_id: number;
  student_id: string;
  tutor_id?: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_paid: boolean;
  notes: string;
  subject_name: string;
  subject_icon_url: string;
  student_full_name?: string;
  tutor_full_name?: string;
  avatar_url: string;
  price: number;
};

const BookingScreen: FC = () => {
  const [activeTab, setActiveTab] = useState<'Oczekujące' | 'Aktualne' | 'Historia'>('Oczekujące');
  const [userInfo, setUserInfo] = useState<null | {
    id: string;
    profile: { full_name: string; is_tutor: boolean };
  }>(null);
  const [bookings, setBookings] = useState<BookingT[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Podzielone listy
  const [pendingBookings, setPendingBookings] = useState<BookingT[]>([]);
  const [activeBookings, setActiveBookings] = useState<BookingT[]>([]);
  const [completedBookings, setCompletedBookings] = useState<BookingT[]>([]);

  // 1. Pobierz dane użytkownika
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiCall<any>({ method: 'GET', url: '/user' });
        setUserInfo({
          id: response.id,
          profile: {
            full_name: response.profile.full_name,
            is_tutor: response.profile.is_tutor,
          },
        });
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserData();
  }, []);

  // 2. Pobierz rezerwacje dopiero jak userInfo jest załadowane i wiemy, czy user jest tutorem
  useEffect(() => {
    if (!userInfo) return;

    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        const url = userInfo.profile.is_tutor ? '/tutor/bookings' : '/student/bookings';
        const bookingsData = await apiCall<BookingT[]>({ method: 'GET', url });
        setBookings(bookingsData);
      } catch (error) {
        console.error('Błąd pobierania rezerwacji:', error);
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [userInfo]);

  // 3. Podziel rezerwacje na kategorie
  useEffect(() => {
    setPendingBookings(bookings.filter((b) => b.status === 'pending'));
    setActiveBookings(
      bookings.filter((b) => b.status === 'accepted' && new Date(b.end_date) >= new Date()),
    );
    setCompletedBookings(
      bookings.filter((b) => b.status === 'accepted' && new Date(b.end_date) < new Date()),
    );
  }, [bookings]);

  const handleTabPress = (tab: 'Oczekujące' | 'Aktualne' | 'Historia') => setActiveTab(tab);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Pasek zakładek */}
        <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16 }}>
          {['Oczekujące', 'Aktualne', 'Historia'].map((tab, index) => (
            <View
              key={tab}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Pressable onPress={() => handleTabPress(tab as any)} style={{ paddingVertical: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: activeTab === tab ? '#1A5100' : '#888',
                  }}
                >
                  {tab}
                </Text>
              </Pressable>
              {index < 2 && (
                <View
                  style={{
                    backgroundColor: '#ddd',
                    position: 'absolute',
                    right: 0,
                    top: 6,
                    bottom: 6,
                    width: 1,
                  }}
                />
              )}
            </View>
          ))}
        </View>

        {/* Treść zakładki */}
        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
          {loadingBookings ? (
            <Text>Ładowanie rezerwacji...</Text>
          ) : activeTab === 'Oczekujące' ? (
            pendingBookings.length === 0 ? (
              <Text>Brak oczekujących rezerwacji.</Text>
            ) : (
              pendingBookings.map((booking) => (
                <Booking
                  key={booking.id}
                  booking={booking}
                  is_tutor={userInfo?.profile.is_tutor ?? false}
                />
              ))
            )
          ) : activeTab === 'Aktualne' ? (
            activeBookings.length === 0 ? (
              <Text>Brak aktualnych rezerwacji.</Text>
            ) : (
              activeBookings.map((booking) => (
                <Booking
                  key={booking.id}
                  booking={booking}
                  is_tutor={userInfo?.profile.is_tutor ?? false}
                />
              ))
            )
          ) : activeTab === 'Historia' ? (
            completedBookings.length === 0 ? (
              <Text>Brak rezerwacji w historii.</Text>
            ) : (
              completedBookings.map((booking) => (
                <Booking
                  key={booking.id}
                  booking={booking}
                  is_tutor={userInfo?.profile.is_tutor ?? false}
                />
              ))
            )
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingScreen;
