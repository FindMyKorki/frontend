import { ScrollView, View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TopPanel from '../components/TopPanel';
import Review from '../components/Review';
import TutorOffer from '../components/TutorOffer';
import TutorProfile from '../components/TutorProfile';
import { useState } from 'react';

const TutorPublicProfile = () => {
  const [activeTab, setActiveTab] = useState('Oferty');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <TopPanel
        onBackPress={() => console.log('Back')}
        onSettingsPress={() => console.log('Settings')}
        tutorName="Jan Kowalski"
        tutorImage="https://randomuser.me/api/portraits/men/32.jpg"
        centerContentClassName="ml-3"
      />

      {/* Profil tutora */}
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

      {/* Wyróżniona opinia */}
      <Text className="text-[12px] font-['Inter'] font-bold text-[#1A5100] px-4 pt-4 ml-2">
        WYRÓŻNIONA OPINIA
      </Text>
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
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: activeTab === tab ? '#1A5100' : '#424242',
                }}
              >
                {tab}
              </Text>
            </Pressable>

            {/* Szary separator tylko dla Oferty i Informacje */}
            {index < 2 && (
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 6,
                  bottom: 6,
                  width: 1,
                  backgroundColor: '#D9D9D9',
                }}
              />
            )}
          </View>
        ))}
      </View>

      {/* Informacja o cenie */}
      {activeTab === 'Oferty' && (
        <View className="flex-row items-center justify-end px-4 mt-4">
          <MaterialIcons name="info" size={11} color="#1A5100" />
          <Text className="text-[#1A5100] text-[9px] font-semibold ml-1">
            Cena za 60 min. zajęć
          </Text>
        </View>
      )}

      {/* Oferty korepetytora - z odstępem pomiędzy ofertami */}
      <View className="px-4 pb-10 mt-2 gap-y-4">
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
        {activeTab === 'Informacje' && (
          <View className="px-4">
            <Text className="text-lg font-bold">Tutaj będą informacje</Text>
          </View>
        )}
        {activeTab === 'Opinie' && (
          <View className="px-4">
            <Text className="text-lg font-bold">Tutaj będą opinie</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TutorPublicProfile;
