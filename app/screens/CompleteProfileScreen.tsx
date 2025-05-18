import { View } from 'react-native';
import React, { useState } from 'react';
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

  const userFormDisplayed = !auth.user?.profile?.full_name;
  const tutorFormDisplayed = !!auth.user?.profile?.full_name && !!auth.user?.profile?.is_tutor;

  const handleSavePress = async () => {
    setLoading(true);

    if (userFormDisplayed) {
      await updateUserProfile(`${name} ${lastName}`, false);
    }

    if (tutorFormDisplayed) {
      await updateTutorInfo(shortBio, bio, email, phone);
    }

    await auth.getSession();
    setLoading(false);
  };

  return (
    <View className={'flex-1 items-center py-def-y px-def-x'}>
      {/*<PhotoEdit />*/}
      {userFormDisplayed && (
        <>
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

export default CompleteProfileScreen;
