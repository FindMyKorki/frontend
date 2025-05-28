import React, { FC, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Button from './AppButton';
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

type OfferCardProps = {
  booking: BookingT;
  is_tutor: boolean; // ✅ Zmieniono na boolean
};

const Booking: FC<OfferCardProps> = ({ booking, is_tutor }) => {
  const [level, setLevel] = useState<string>('Nieznany');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const data = await apiCall<any>({
          method: 'GET',
          url: `/offers/${booking.offer_id}`,
        });

        setLevel(data.level ?? 'Nieznany');
      } catch (error) {
        console.error('Błąd pobierania poziomu oferty:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [booking.offer_id]);

  const formatDateAndTime = (startISO: string, endISO: string) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    const dayNames = [
      'niedziela',
      'poniedziałek',
      'wtorek',
      'środa',
      'czwartek',
      'piątek',
      'sobota',
    ];
    const monthNames = [
      'stycznia',
      'lutego',
      'marca',
      'kwietnia',
      'maja',
      'czerwca',
      'lipca',
      'sierpnia',
      'września',
      'października',
      'listopada',
      'grudnia',
    ];

    const day = start.getDate();
    const month = monthNames[start.getMonth()].toUpperCase();
    const weekday = dayNames[start.getDay()].toUpperCase();
    const startTime = start.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

    return {
      dateText: `${day} ${month} (${weekday})`,
      timeText: `${startTime} - ${endTime}`,
    };
  };

  const getDisplayStatus = (status: string, endDate: string): '1' | '2' | '3' => {
    const now = new Date();
    const end = new Date(endDate);

    if (status === 'pending') return '1';
    if (status === 'accepted' && end >= now) return '2';
    if (status === 'accepted' && end < now) return '3';
    return '1';
  };

  const displayStatus = getDisplayStatus(booking.status, booking.end_date);
  const { dateText, timeText } = formatDateAndTime(booking.start_date, booking.end_date);

  const displayName = is_tutor ? booking.student_full_name : booking.tutor_full_name;
  const safeDisplayName = displayName || 'Nieznany użytkownik';

  const handlePress = () => {
    console.log('Kliknięto cały element - booking ID:', booking.id);
  };

  if (loading) return <Text className="text-center mt-4">Ładowanie...</Text>;

  return (
    <Pressable onPress={handlePress}>
      <View className="px-def-x py-def-y">
        <View className="bg-background border-2 border-border-gray px-def-x py-def-y rounded-md flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-base text-text-dark font-bold uppercase">{dateText}</Text>
            <Text className="text-sm text-text-light">{timeText}</Text>
            <Text className="text-sm font-bold text-text-dark mb-1">{booking.price} zł</Text>
            <Text className="text-sm text-primary">
              {booking.subject_name}, {level}
            </Text>
            <Text className="text-sm font-bold text-primary">{safeDisplayName}</Text>
          </View>

          <View className="flex flex-col items-end justify-center ml-4">
            {is_tutor ? (
              <>
                {displayStatus === '1' && (
                  <>
                    <Button
                      label="Szczegóły"
                      onPress={() => console.log('Szczegóły')}
                      size="auto"
                      className="px-4 py-1 mb-1"
                    />
                    <Button
                      label="Anuluj"
                      onPress={() => console.log('Anulowano')}
                      size="auto"
                      appearance="outlined"
                      className="px-4 py-1"
                    />
                  </>
                )}
                {displayStatus === '2' && (
                  <Button
                    label="Szczegóły"
                    onPress={() => console.log('Szczegóły')}
                    size="auto"
                    className="px-4 py-1"
                  />
                )}
                {displayStatus === '3' && (
                  <>
                    <Button
                      label="Szczegóły"
                      onPress={() => console.log('Szczegóły')}
                      size="auto"
                      className="px-4 py-1 mb-1"
                    />
                    <Button
                      label="Powtórz"
                      onPress={() => console.log('Powtórz')}
                      size="auto"
                      appearance="outlined"
                      className="px-4 py-1"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {displayStatus === '1' && (
                  <>
                    <Button
                      label="Zatwierdź"
                      onPress={() => console.log('Zatwierdzono')}
                      size="auto"
                      className="px-4 py-1 mb-1"
                    />
                    <Button
                      label="Anuluj"
                      onPress={() => console.log('Szczegóły')}
                      size="auto"
                      appearance="outlined"
                      className="px-4 py-1"
                    />
                  </>
                )}
                {displayStatus === '2' && (
                  <Button
                    label="Szczegóły"
                    onPress={() => console.log('Szczegóły')}
                    size="auto"
                    className="px-4 py-1"
                  />
                )}
                {displayStatus === '3' && (
                  <>
                    <Button
                      label="Szczegóły"
                      onPress={() => console.log('Szczegóły')}
                      size="auto"
                      className="px-4 py-1 mb-1"
                    />
                    <Button
                      label="Czat"
                      onPress={() => console.log('Czat')}
                      size="auto"
                      appearance="outlined"
                      className="px-4 py-1"
                    />
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Booking;
