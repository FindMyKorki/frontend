import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import TopPanel from '../components/TopPanel';
import Review from '../components/Review';
import TutorOffer from '../components/TutorOffer';
import TutorProfile from '../components/TutorProfile';
import BottomPanelButtons from '../components/BottomPanelButtons';
import SortDropdown from '../components/SortDropdown';
import BottomModal from '../components/BottomModal';
import Button from '../components/AppButton';
import { Colors } from '../../src/colors';

const TutorPublicProfile = () => {
  const [activeTab, setActiveTab] = useState<'Oferty' | 'Informacje' | 'Opinie'>('Oferty');
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const navigation = useNavigation();

  //tu musze dodac z bazy nr telefonu
  const selectedPhoneNumber = '505844336';

  const callNumber = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendSMS = (phoneNumber: string) => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const reviewSortOptions = [
    'Po ocenie malejąco',
    'Po ocenie rosnąco',
    'Po dacie malejąco',
    'Po dacie rosnąco',
  ];

  const handleTabPress = (tab: 'Oferty' | 'Informacje' | 'Opinie') => {
    setActiveTab(tab);
  };

  const offers = [
    {
      subject: 'Matematyka',
      educationLevel: 'Szkoła średnia',
      price: '50 zł',
      description: 'Pomagam przygotować się do matury z matematyki.',
    },
    {
      subject: 'Fizyka',
      educationLevel: 'Studia',
      price: '80 zł',
      description: 'Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki.',
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="bg-background pb-10">
        <TopPanel
          onBackPress={() => console.log('Back')}
          onSettingsPress={() => console.log('Settings')}
          name="Jan Kowalski"
          image="https://randomuser.me/api/portraits/men/32.jpg"
          centerContentClassName="ml-3"
        />

        <View className="px-2 pt-2">
          <TutorProfile
            tutorName="Jan Kowalski"
            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
            rating={4.5}
            reviewCount={15}
            description="Jestem doświadczonym korepetytorem matematyki i fizyki. Pomagam uczniom zrozumieć trudne tematy oraz przygotowuję ich do egzaminów."
            onPressReviews={() => handleTabPress('Opinie')}
          />
        </View>

        <Text className="text-xs font-bold text-primary px-4 pt-4 ml-2">WYRÓŻNIONA OPINIA</Text>
        <View className="px-4 pt-2">
          <Review
            fullName="Anna Kowalska"
            avatarUrl="https://randomuser.me/api/portraits/women/32.jpg"
            comment="Świetny korepetytor, bardzo dobrze tłumaczy!"
            rating={5}
          />
        </View>

        <View className="flex-row mt-2 mb-2">
          {['Oferty', 'Informacje', 'Opinie'].map((tab, index) => (
            <View key={tab} className="flex-1 relative items-center justify-center">
              <Pressable
                onPress={() => handleTabPress(tab as any)}
                className="py-3 items-center justify-center"
              >
                <Text
                  className={`text-base font-bold ${activeTab === tab ? 'text-primary' : 'text-text-light'}`}
                >
                  {tab}
                </Text>
              </Pressable>
              {index < 2 && (
                <View className="bg-border-gray absolute right-0 top-1.5 bottom-1.5 w-[1px]" />
              )}
            </View>
          ))}
        </View>

        {activeTab === 'Oferty' && (
          <>
            <View className="flex-row items-center justify-end px-4 mt-4">
              <MaterialIcons name="info" size={11} color="#1A5100" />
              <Text className="text-primary text-[0.5rem] font-semibold ml-1">
                Cena za 60 min. zajęć
              </Text>
            </View>
            <View className="px-4 pb-10 mt-2 gap-y-2">
              {offers.map((offer, idx) => (
                <TutorOffer
                  key={idx}
                  subject={offer.subject}
                  educationLevel={offer.educationLevel}
                  price={offer.price}
                  description={offer.description}
                  userType="student"
                />
              ))}
            </View>
          </>
        )}

        {activeTab === 'Informacje' && (
          <View className="px-4">
            <Text className="text-lg font-bold">Tutaj będą informacje</Text>
          </View>
        )}

        {activeTab === 'Opinie' && (
          <View className="px-4 gap-y-2">
            <SortDropdown options={reviewSortOptions} onSelect={(option) => console.log(option)} />
            {[1, 2, 3, 4, 5].map((n) => (
              <Review
                key={n}
                fullName="Jan Kowalski"
                avatarUrl={`https://avatar.iran.liara.run/public/${n}`}
                comment="Bardzo dobre zajęcia i świetne tłumaczenie materiału."
                rating={2 + n * 0.5}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomPanelButtons
        leftButtonProps={{
          label: 'Wyślij wiadomość',
          onPress: () => {
            console.log('Wyślij wiadomość');
            // navigation.navigate('Chat');
          },
          icon: <MaterialIcons name="chat-bubble" size={20} color="white" />,
        }}
        rightButtonProps={{
          label: 'Zadzwoń / SMS',
          onPress: () => setBottomModalVisible(true),
          appearance: 'outlined',
          icon: <MaterialIcons name="phone" size={20} color={Colors.primary} />,
        }}
      />

      <BottomModal visible={bottomModalVisible} setVisible={setBottomModalVisible}>
        <View className="w-full items-center justify-center">
          <View className="flex flex-col items-center gap-y-2">
            <Button
              label="Zadzwoń"
              appearance="transparent"
              onPress={() => {
                callNumber(selectedPhoneNumber);
                setBottomModalVisible(false);
              }}
              icon={<MaterialIcons name="phone" size={20} color={Colors.primary} />}
            />
            <Button
              label="Wyślij SMS"
              appearance="transparent"
              onPress={() => {
                sendSMS(selectedPhoneNumber);
                setBottomModalVisible(false);
              }}
              icon={<MaterialIcons name="chat-bubble" size={20} color={Colors.primary} />}
            />
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default TutorPublicProfile;
