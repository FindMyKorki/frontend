import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TopPanel from '../components/TopPanel';
import Review from '../components/Review';
import TutorOffer from '../components/TutorOffer';
import TutorProfile from '../components/TutorProfile';
import BottomPanelButtons from '../components/BottomPanelButtons';
import SortDropdown from '../components/SortDropdown';
import BottomModal from '../components/BottomModal';
import Button from '../components/AppButton';
import React from 'react';
import { Colors } from '../../src/colors';
import Calendar from '../components/Calendar';
import TutorDescription from '../components/TutorDescription';
import { apiCall } from '../utils/ApiHandler';
import EditAvailabilityScreen from '../screens/EditAvailabilityScreen';
import { NavigationProp } from '@react-navigation/native';

// Do przejścia w tryb edycji dostępności (nawigacja)
type RootStackParamList = {
  ProfileEditAvailability: undefined; // Brak parametrów dla tego ekranu
  EditAvailability: undefined; // Brak parametrów dla tego ekranu
  ChatScreen: { user: { id: string; userId: string } }; // Parametry dla ekranu czatu
};

const ProfileEditAvailability = () => {
  const [activeTab, setActiveTab] = useState('Oferty');
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [userType, setUserType] = useState('tutor'); // 'student' lub 'tutor'
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const createChat = async (tutorId: string, studentId: string): Promise<any> => {
    try {
      const response = await apiCall({
        method: 'POST',
        url: '/chats',
        data: { tutor_id: tutorId, student_id: studentId },
      });
      return response.chat;
    } catch (error) {
      console.error('Błąd tworzenia czatu:', error);
      throw error;
    }
  };

  const reviewSortOptions = [
    'Po ocenie malejąco',
    'Po ocenie rosnąco',
    'Po dacie malejąco',
    'Po dacie rosnąco',
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View className="flex-1">
      <TopPanel
        onBackPress={() => navigation.goBack()}
        name="Jan Kowalski"
        image="https://randomuser.me/api/portraits/men/32.jpg"
        centerContentClassName="ml-3"
        showSettings={userType === 'tutor'}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="bg-background pb-10">
        {/* Profil tutora */}
        <View className="px-2 pt-2">
          <TutorProfile
            tutorName="Jan Kowalski"
            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
            rating={4.5}
            reviewCount={15}
            description="Jestem doświadczonym korepetytorem matematyki i fizyki. Pomagam uczniom zrozumieć trudne tematy oraz przygotowuję ich do egzaminów."
            onPressReviews={() => handleTabPress('Opinie')}
            isEditable={userType === 'tutor'}
          />
        </View>

        {/* Wyróżniona opinia */}
        <Text className="text-xs font-bold text-primary px-4 pt-4 ml-2">WYRÓŻNIONA OPINIA</Text>
        <View className="px-4 pt-2">
          <Review
            fullName="Anna Kowalska"
            avatarUrl="https://randomuser.me/api/portraits/women/32.jpg"
            comment="Świetny korepetytor, bardzo dobrze tłumaczy!"
            rating={5}
          />
        </View>

        {/* Pasek Oferty | Informacje | Opinie */}
        <View className="flex-row mt-2 mb-2">
          {['Oferty', 'Informacje', 'Opinie'].map((tab, index) => (
            <View key={tab} className="flex-1 relative items-center justify-center">
              <Pressable
                onPress={() => handleTabPress(tab)}
                className="py-3 items-center justify-center"
              >
                <Text
                  className={`text-base font-bold ${
                    activeTab === tab ? 'text-primary' : 'text-text-light'
                  }`}
                >
                  {tab}
                </Text>
              </Pressable>

              {/* Szary separator tylko dla Oferty i Informacje */}
              {index < 2 && (
                <View className="bg-border-gray absolute right-0 top-1.5 bottom-1.5 w-[1px]" />
              )}
            </View>
          ))}
        </View>

        {/* Sekcja Informacje */}
        {activeTab === 'Informacje' && (
          <View className="px-4">
            {/* Kontakt */}
            <View className="flex-row justify-between items-center py-2 mt-5">
              <Text className="font-medium text-lg">E-mail:</Text>
              <Text className="font-medium text-lg text-right">example@asd.com</Text>
            </View>
            <View style={{ borderTopWidth: 4, borderColor: '#f1f1f1' }} />
            <View className="flex-row justify-between items-center py-2 mt-2">
              <Text className="font-medium text-lg">Telefon:</Text>
              <Text className="font-medium text-lg text-right">123 456 789</Text>
            </View>
            <View style={{ borderTopWidth: 4, borderColor: '#f1f1f1' }} />

            {/* Sekcja DOSTĘPNOŚĆ*/}
            <View className="flex-row justify-between items-center mt-6 mb-5">
              <Text className="font-inter font-bold text-xl text-primary">DOSTĘPNOŚĆ</Text>
              <MaterialIcons
                name="edit"
                size={15}
                color="#1A5100"
                onPress={() => navigation.navigate('EditAvailability')}
              />
            </View>
            <Calendar className="mt-2" tutor_id="1" />

            <Text className="font-inter font-bold text-xl text-primary mt-12">O MNIE</Text>
            <TutorDescription
              className="mt-4"
              description="Jestem doświadczonym korepetytorem matematyki i fizyki. Pomagam uczniom zrozumieć trudne tematy oraz przygotowuję ich do egzaminów."
            />
          </View>
        )}

        {/* Informacja o cenie */}
        {activeTab === 'Oferty' && (
          <View className="flex-row items-center justify-end px-4 mt-4">
            <MaterialIcons name="info" size={11} color="#1A5100" />
            <Text className="text-primary text-[0.5rem] font-semibold ml-1">
              Cena za 60 min. zajęć
            </Text>
          </View>
        )}

        {/* Oferty korepetytora - z odstępem pomiędzy ofertami */}
        <View className="px-4 pb-10 mt-2 gap-y-2">
          {/* W zależności od aktywnej zakładki pokazujemy odpowiednią zawartość */}
          {activeTab === 'Oferty' && (
            <>
              <TutorOffer
                subject="Matematyka"
                educationLevel="Szkoła średnia"
                price="50 zł"
                description="Pomagam przygotować się do matury z matematyki."
                userType="student"
              />
              <TutorOffer
                subject="Fizyka"
                educationLevel="Studia"
                price="80 zł"
                description="Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki."
                userType="student"
              />
              <TutorOffer
                subject="Matematyka"
                educationLevel="Szkoła średnia"
                price="50 zł"
                description="Pomagam przygotować się do matury z matematyki."
                userType="student"
              />
              <TutorOffer
                subject="Fizyka"
                educationLevel="Studia"
                price="80 zł"
                description="Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki."
                userType="student"
              />
              <TutorOffer
                subject="Matematyka"
                educationLevel="Szkoła średnia"
                price="50 zł"
                description="Pomagam przygotować się do matury z matematyki."
                userType="student"
              />
              <TutorOffer
                subject="Fizyka"
                educationLevel="Studia"
                price="80 zł"
                description="Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki."
                userType="student"
              />
              <TutorOffer
                subject="Matematyka"
                educationLevel="Szkoła średnia"
                price="50 zł"
                description="Pomagam przygotować się do matury z matematyki."
                userType="student"
              />
              <TutorOffer
                subject="Fizyka"
                educationLevel="Studia"
                price="80 zł"
                description="Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki."
                userType="student"
              />
              <TutorOffer
                subject="Matematyka"
                educationLevel="Szkoła średnia"
                price="50 zł"
                description="Pomagam przygotować się do matury z matematyki."
                userType="student"
              />
              <TutorOffer
                subject="Fizyka"
                educationLevel="Studia"
                price="80 zł"
                description="Wyjaśnię trudne zagadnienia z mechaniki i termodynamiki."
                userType="student"
              />
            </>
          )}

          {activeTab === 'Opinie' && (
            <>
              <SortDropdown
                options={reviewSortOptions}
                onSelect={(option) => console.log(option)}
              />

              <Review
                fullName="Jan Kowalski"
                avatarUrl="https://avatar.iran.liara.run/public/1"
                comment="Zajęcia z panią Anną to czysta przyjemność! Tłumaczy w sposób jasny i cierpliwy, a jej pasja do nauczania naprawdę motywuje do pracy. Polecam każdemu, kto chce solidnie przygotować się do egzaminów!"
                rating={3}
              />
              <Review
                fullName="Jan Kowalski"
                avatarUrl="https://avatar.iran.liara.run/public/3"
                comment="Pani Katarzyna to bardzo kompetentna i zaangażowana nauczycielka. Dzięki niej moja córka poprawiła oceny z matematyki i odzyskała pewność siebie. Świetny kontakt i bardzo miła atmosfera na zajęciach."
                rating={3.5}
              />
              <Review
                fullName="Jan Kowalski"
                avatarUrl="https://avatar.iran.liara.run/public/2"
                comment="Pan Michał świetnie radzi sobie z indywidualnym podejściem do ucznia. Pomógł mi zrozumieć zagadnienia, które wcześniej wydawały się nie do opanowania. Zdecydowanie jeden z najlepszych tutorów, z jakimi miałem okazję pracować."
                rating={4}
              />
              <Review
                fullName="Jan Kowalski"
                avatarUrl="https://avatar.iran.liara.run/public/4"
                comment="Pan Tomasz ma ogromną wiedzę i potrafi ją w przystępny sposób przekazać. Zawsze dobrze przygotowany do zajęć, punktualny i cierpliwy. Serdecznie polecam!"
                rating={5}
              />
              <Review
                fullName="Jan Kowalski"
                avatarUrl="https://avatar.iran.liara.run/public/5"
                comment="Dzięki lekcjom z panią Magdą zdałam maturę z języka angielskiego na bardzo dobrym poziomie. Zajęcia były ciekawe, dynamiczne i dopasowane do moich potrzeb."
                rating={2.5}
              />
            </>
          )}
        </View>
      </ScrollView>
      <BottomPanelButtons
        leftButtonProps={{
          label: 'Wyślij wiadomość',
          onPress: async () => {
            try {
              const loggedUserId = '<ID_zalogowanego_użytkownika>';
              const tutorId = '123';
              const chat = await createChat(tutorId, loggedUserId);

              if (chat && chat.id) {
                navigation.navigate('ChatScreen', {
                  user: {
                    id: chat.id,
                    userId: loggedUserId,
                  },
                });
              } else {
                console.error('Nie udało się utworzyć czatu');
              }
            } catch (error) {
              console.error('Wystąpił błąd przy tworzeniu czatu:', error);
            }
          },

          icon: <MaterialIcons name="chat-bubble" size={20} color="white" />,
        }}
        rightButtonProps={{
          label: 'Zadzwoń / SMS',
          onPress: () => {
            setBottomModalVisible(true);
          },
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
                console.log('Zadzwoń');
              }}
              icon={<MaterialIcons name="phone" size={20} color={Colors.primary} />}
            />
            <Button
              label="Wyślij SMS"
              appearance="transparent"
              onPress={() => {
                console.log('Wyślij SMS');
              }}
              icon={<MaterialIcons name="chat-bubble" size={20} color={Colors.primary} />}
            />
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default ProfileEditAvailability;
