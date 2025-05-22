import React, { useState } from 'react';
import { View, Image, ScrollView, Pressable } from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import TopPanel from '../../components/TopPanel';
import BottomPanelButtons from '../../components/BottomPanelButtons';
import BottomModal from '../../components/BottomModal';
import Button from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../../src/colors';

const EditProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bioShort, setBioShort] = useState('');
  const [bioLong, setBioLong] = useState('');

  const [bottomModalVisible, setBottomModalVisible] = useState(false);

  const nav = useNavigation();

  const saveChanges = () => {
    console.log('Zapisz zmiany');
  };

  return (
    <View className="flex-1">
      <TopPanel onBackPress={() => nav.goBack()} showSettings />
      <ScrollView showsVerticalScrollIndicator={false} className="bg-background">
        <View className="px-4 pb-10 gap-y-6 pt-2">
          <View className="flex-row justify-center items-center">
            <Pressable onPress={() => setBottomModalVisible(true)} className="relative">
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />

              <View className="absolute top-0 right-0 bg-background-alt rounded-full p-1.5">
                <MaterialIcons name="edit" size={20} color={Colors.primary} />
              </View>
            </Pressable>
          </View>

          <AppTextInput
            value={email}
            setValue={setEmail}
            label="E-mail"
            placeholder="Twój e-mail"
            keyboardType="email-address"
          />

          <AppTextInput
            value={phoneNumber}
            setValue={setPhoneNumber}
            label="Telefon"
            placeholder="Twój numer telefonu"
            keyboardType="phone-pad"
          />

          <AppTextInput
            value={bioShort}
            setValue={setBioShort}
            label="Krótki opis"
            placeholder="Twój krótki opis"
            multiline
            inputHeightClass="h-20"
          />

          <AppTextInput
            value={bioLong}
            setValue={setBioLong}
            label="Długi opis"
            placeholder="Twój długi opis"
            multiline
            inputHeightClass="h-96"
          />
        </View>
      </ScrollView>

      <BottomPanelButtons
        leftButtonProps={{
          label: 'Zapisz zmiany',
          onPress: () => {
            saveChanges();
            nav.goBack();
          },
        }}
      />

      <BottomModal visible={bottomModalVisible} setVisible={setBottomModalVisible}>
        <View className="w-full items-center justify-center">
          <View className="flex flex-col items-center gap-y-2">
            <Button
              label="Dodaj zdjęcie z aparatu"
              appearance="transparent"
              onPress={() => {
                console.log('Dodaj zdjęcie z aparatu');
              }}
              icon={<MaterialIcons name="photo-camera" size={20} color={Colors.primary} />}
            />
            <Button
              label="Dodaj zdjęcie z galerii"
              appearance="transparent"
              onPress={() => {
                console.log('Dodaj zdjęcie z galerii');
              }}
              icon={<MaterialIcons name="photo-library" size={20} color={Colors.primary} />}
            />
            <Button
              label="Usuń zdjęcie"
              appearance="transparent"
              onPress={() => {
                console.log('Usuń zdjęcie');
              }}
              icon={<MaterialIcons name="delete" size={20} color={Colors.primary} />}
            />
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default EditProfileScreen;
