import { ScrollView, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
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
//import { apiCall } from '../utils/ApiHandler';
import { getTutorReviews, getActiveTutorOffers } from '../hooks/useApi';
import { TutorReviewList } from '../types/Review';
import { TutorOfferList } from '../types/Offer';

const TutorPublicProfile = () => {
  const tutorId = '75eca90f-fc98-426d-a46b-58f8ce4dd3f2';

  const [reviews, setReviews] = useState<TutorReviewList | null>(null);
  const [offers, setOffers] = useState<TutorOfferList | null>(null);

  const [activeTab, setActiveTab] = useState('Oferty');
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [userType, setUserType] = useState('tutor'); // 'student' lub 'tutor'
  const navigation = useNavigation();

  const reviewSortOptions = [
    { label: 'Po ocenie malejąco', sortBy: 'rating', orderBy: 'decreasing' },
    { label: 'Po ocenie rosnąco', sortBy: 'rating', orderBy: 'increasing' },
    { label: 'Po dacie malejąco', sortBy: 'date', orderBy: 'decreasing' },
    { label: 'Po dacie rosnąco', sortBy: 'date', orderBy: 'increasing' },
  ] as const;
  const reviewSortLabels = reviewSortOptions.map((option) => option.label);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSort = async (option: string) => {
    const selected = reviewSortOptions.find((o) => o.label === option);

    if (!selected) return;

    const fetchedReviews = await getTutorReviews(tutorId, selected.sortBy, selected.orderBy);

    if (fetchedReviews) {
      setReviews(fetchedReviews);
    }
  };

  const handleGetActiveOffers = async () => {
    const fetchedOffers = await getActiveTutorOffers(tutorId);

    if (fetchedOffers) {
      setOffers(fetchedOffers);
    }
  };

  useEffect(() => {
    handleSort(reviewSortLabels[0]);
    handleGetActiveOffers();
  }, []);

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
            <Text className="font-inter font-bold text-xl text-primary mt-6 mb-5">DOSTĘPNOŚĆ</Text>
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
              {offers?.length ? (
                offers.map((o) => (
                  <TutorOffer
                    subject={o.subject_name || ''}
                    educationLevel={o.level || ''}
                    price={o.price?.toString() || ''}
                    description={o.description || ''}
                    userType="student"
                  />
                ))
              ) : (
                <View className="flex-1 items-center mt-10">
                  <Text className="text-base text-text-light">Brak ofert...</Text>
                </View>
              )}
            </>
          )}

          {activeTab === 'Opinie' && (
            <>
              <SortDropdown options={reviewSortLabels} onSelect={handleSort} />
              {reviews?.length ? (
                reviews.map((r) => (
                  <Review
                    fullName={r.student_full_name}
                    avatarUrl={r.student_avatar_url || ''}
                    comment={r.comment}
                    rating={r.rating || 0}
                  />
                ))
              ) : (
                <View className="flex-1 items-center mt-10">
                  <Text className="text-base text-text-light">Brak opinii...</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <BottomPanelButtons
        leftButtonProps={{
          label: 'Wyślij wiadomość',
          onPress: () => {
            navigation.navigate('Chat' as never);
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

export default TutorPublicProfile;
