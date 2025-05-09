import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import TopPanel from '../components/TopPanel';

const ReportChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chatId, name } = route.params as { chatId: string; name: string };

  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim() === '') {
      Alert.alert('Błąd', 'Proszę wpisać powód zgłoszenia.');
      return;
    }

    console.log(`Zgłoszono czat ${chatId} z powodem: ${reason}`);

    Alert.alert('Zgłoszenie wysłane', 'Dziękujemy za zgłoszenie. Nasz zespół się nim zajmie.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="p-4 flex-1">
          <TopPanel onBackPress={() => navigation.goBack()} name="Zgłoś czat" />

          <Text className="text-base mb-2">Powód zgłoszenia:</Text>

          <TextInput
            value={reason}
            onChangeText={setReason}
            multiline
            textAlignVertical="top"
            className="border border-gray-300 p-2 rounded-lg h-60 text-sm"
            placeholder="Wpisz powód zgłoszenia..."
          />

          <Pressable
            className="bg-[#1A5100] mt-6 py-3 rounded-full items-center justify-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-semibold text-base">Zgłoś</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReportChatScreen;
