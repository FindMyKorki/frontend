import { View, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../utils/AuthProvider';
import LabeledTextInput from './LabeledTextInput';
import { updateTutorInfo, updateUserProfile, getUser } from '../hooks/useApi';
import ImageInput from './ImageInput';
import BottomModal from './BottomModal';
import Button from './AppButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../src/colors';
import BottomPanelButtons from './BottomPanelButtons';
import TopPanel from './TopPanel';
import { useNavigation } from '@react-navigation/native';

type ProfileFormProps = {
  navigateTo?: () => void;
  buttonLabel: string;
};

const ProfileForm: FC<ProfileFormProps> = ({ navigateTo = () => {}, buttonLabel }) => {
  const auth = useAuth();
  const nav = useNavigation();

  const [loading, setLoading] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bioLong, setBioLong] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const [avatar, setAvatar] = useState<string>('');

  // const userFormDisplayed = !auth.user?.profile?.full_name;
  // const tutorFormDisplayed = !!auth.user?.profile?.full_name && !!auth.user?.profile?.is_tutor;
  const userFormDisplayed = true;
  const tutorFormDisplayed = !!auth.user?.profile?.is_tutor;

  useEffect(() => {
    if (userFormDisplayed) {
    }
    if (tutorFormDisplayed) {
      (async () => {
        const user = await getUser();
        setFullName(user?.profile?.full_name ?? '');
        setAvatar(user?.profile?.avatar_url ?? '');
        if (user?.profile?.is_tutor) {
          setEmail(user?.tutor_profile?.contact_email ?? '');
          setPhone(user?.tutor_profile?.phone_number ?? '');
          setBioLong(user?.tutor_profile?.bio_long ?? '');
          setBio(user?.tutor_profile?.bio ?? '');
        }
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus !== 'granted') {
          alert('Brak uprawnień do galerii!');
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          alert('Brak uprawnień do kamery!');
        }
      }
    })();
  }, []);

  const MAX_FILE_SIZE = 8 * 1024 * 1024;

  const getImageFromSource = async (source: 'camera' | 'gallery') => {
    try {
      let pickerFunc =
        source === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;

      const result = await pickerFunc({
        mediaTypes: 'images',
        quality: 0.8,
        base64: true,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
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
      await updateUserProfile(fullName, false, avatar);
    }

    if (tutorFormDisplayed) {
      await updateTutorInfo(bio, bioLong, email, phone);
    }

    await auth.getSession();
    setLoading(false);
    navigateTo();
  };

  return (
    <View className="flex-1">
      <TopPanel onBackPress={() => nav.goBack()} showSettings />

      <ScrollView className="flex-1 bg-background py-def-y px-def-x">
        <View className={'flex-1 items-center gap-y-4'}>
          {userFormDisplayed && (
            <>
              <ImageInput
                image={avatar}
                onImagePress={() => {
                  setBottomModalVisible(true);
                }}
              />
              <LabeledTextInput
                label={'Imię'}
                className={'w-full'}
                editable={!loading}
                value={fullName}
                onChangeText={setFullName}
              />
            </>
          )}

          {tutorFormDisplayed && (
            <>
              <LabeledTextInput
                label={'E-mail'}
                className={'w-full'}
                editable={!loading}
                value={email}
                onChangeText={setEmail}
                textContentType={'emailAddress'}
              />
              <LabeledTextInput
                label={'Telefon'}
                className={'w-full'}
                editable={!loading}
                value={phone}
                keyboardType={'phone-pad'}
                onChangeText={setPhone}
                textContentType={'telephoneNumber'}
              />
              <LabeledTextInput
                label={'Krótki opis'}
                className={'w-full'}
                editable={!loading}
                value={bio}
                onChangeText={setBio}
                multiline={true}
                inputClassName="h-20"
                textAlignVertical="top"
              />
              <LabeledTextInput
                label={'Długi opis'}
                className={'w-full mb-4'}
                editable={!loading}
                value={bioLong}
                onChangeText={setBioLong}
                numberOfLines={10}
                multiline={true}
                inputClassName="h-96"
                textAlignVertical="top"
              />
            </>
          )}
        </View>
      </ScrollView>

      <BottomModal visible={bottomModalVisible} setVisible={setBottomModalVisible}>
        <View className="w-full items-center justify-center">
          <View className="flex flex-col items-center gap-y-2">
            <Button
              label="Dodaj zdjęcie z aparatu"
              appearance="transparent"
              className="self-center"
              onPress={async () => {
                await getImageFromSource('camera');
                setBottomModalVisible(false);
              }}
              icon={<MaterialIcons name="photo-camera" size={20} color={Colors.primary} />}
            />
            <Button
              label="Dodaj zdjęcie z galerii"
              appearance="transparent"
              className="self-center"
              onPress={async () => {
                await getImageFromSource('gallery');
                setBottomModalVisible(false);
              }}
              icon={<MaterialIcons name="photo-library" size={20} color={Colors.primary} />}
            />
            <Button
              label="Usuń zdjęcie"
              appearance="transparent"
              className="self-center"
              onPress={() => {
                setAvatar('');
                setBottomModalVisible(false);
              }}
              icon={<MaterialIcons name="delete" size={20} color={Colors.primary} />}
            />
          </View>
        </View>
      </BottomModal>

      <BottomPanelButtons
        leftButtonProps={{
          label: buttonLabel,
          onPress: () => {
            handleSavePress();
          },
        }}
      />
    </View>
  );
};

export default ProfileForm;
