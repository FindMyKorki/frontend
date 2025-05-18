import { View, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../utils/AuthProvider';
import LabeledTextInput from '../components/LabeledTextInput';
import AppButton from '../components/AppButton';
import { updateTutorInfo, updateUserProfile } from '../hooks/useApi';

const CompleteProfileScreen = () => {
  const auth = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [shortBio, setShortBio] = useState<string>('');

  const [avatar, setAvatar] = useState<string>('');

  const userFormDisplayed = !auth.user?.profile?.full_name;
  const tutorFormDisplayed = !!auth.user?.profile?.full_name && !!auth.user?.profile?.is_tutor;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Brak uprawnień do galerii!');
        }
      }
    })();
  }, []);

  const MAX_FILE_SIZE = 8 * 1024 * 1024;

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: true,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        const asset = result.assets[0];
        const { uri, base64 } = asset;

        const fileSize = base64 ? (base64.length * 3) / 4 : 0;

        if (fileSize > MAX_FILE_SIZE) {
          console.warn('Plik jest za duży:', fileSize, 'bajtów');
          return;
        }

        setAvatar(uri);
      }
    } catch (e) {
      console.error('Błąd podczas wybierania zdjęcia:', e);
    }
  };

  const handleSavePress = async () => {
    setLoading(true);

    if (userFormDisplayed) {
      await updateUserProfile(`${name} ${lastName}`, false, avatar);
    }

    if (tutorFormDisplayed) {
      await updateTutorInfo(shortBio, bio, email, phone);
    }

    await auth.getSession();
    setLoading(false);
  };

  return (
    <View className={'flex-1 items-center py-def-y px-def-x'}>
      {userFormDisplayed && (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper} className={'mt-12'}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </TouchableOpacity>
          <LabeledTextInput
            label={'Imię'}
            className={'w-full mb-4'}
            editable={!loading}
            value={name}
            onChangeText={setName}
          />
          <LabeledTextInput
            label={'Nazwisko'}
            className={'w-full'}
            editable={!loading}
            value={lastName}
            onChangeText={setLastName}
          />
        </>
      )}

      {tutorFormDisplayed && (
        <>
          <LabeledTextInput
            label={'E-mail'}
            className={'w-full mb-4'}
            editable={!loading}
            value={email}
            onChangeText={setEmail}
            textContentType={'emailAddress'}
          />
          <LabeledTextInput
            label={'Telefon'}
            className={'w-full mb-4'}
            editable={!loading}
            value={phone}
            keyboardType={'phone-pad'}
            onChangeText={setPhone}
            textContentType={'telephoneNumber'}
          />
          <LabeledTextInput
            label={'Krótki opis'}
            className={'w-full mb-4'}
            editable={!loading}
            value={shortBio}
            onChangeText={setShortBio}
            numberOfLines={2}
            multiline={true}
          />
          <LabeledTextInput
            label={'Długi opis'}
            className={'w-full'}
            editable={!loading}
            value={bio}
            onChangeText={setBio}
            numberOfLines={10}
            multiline={true}
            style={{ height: 10 * 20, textAlignVertical: 'top' }}
          />
        </>
      )}

      <View className={'flex-1'} />
      <AppButton
        label={'Zapisz'}
        className={'w-full'}
        loading={loading}
        onPress={handleSavePress}
        disabled={
          (userFormDisplayed && (!name || !lastName)) ||
          (tutorFormDisplayed && (!email || !phone || !shortBio || !bio))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#999',
  },
});

export default CompleteProfileScreen;
