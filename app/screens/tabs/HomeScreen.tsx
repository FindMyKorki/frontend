import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const HomeScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Home screen'} />

      <Button title={'Przejdź do UserDetailsScreen'} onPress={() => nav.navigate('UserDetails')} />
      <Button title={'Przejdź do SearchScreen'} onPress={() => nav.navigate('Search')} />
      <Button title={'Przejdź do FiltersScreen'} onPress={() => nav.navigate('Filters')} />
      <Button title={'Przejdź do SortOptionsScreen'} onPress={() => nav.navigate('SortOptions')} />
      <Button
        title={'Przejdź do TutorProfileScreen ( właściciel / student)'}
        onPress={() =>
          nav.navigate('TutorProfileScreen', { tutorId: '4eefa979-0bee-43c5-b765-7303ff80fe4b' })
        }
      />
      <Button title={'Przejdź do ReportScreen'} onPress={() => nav.navigate('Report')} />
      <Button title={'Przejdź do LoginScreen'} onPress={() => nav.navigate('Login')} />
      <Button title={'Przejdź do RoleScreen'} onPress={() => nav.navigate('Role')} />
      <Button
        title={'Przejdź do ProfileEditAvailabilityScreen'}
        onPress={() => nav.navigate('ProfileEditAvailability')}
      />
      <Button
        title={'Przejdź do ProfileEditAvailabilityScreen'}
        onPress={() => nav.navigate('AvailabilityRepetitionScreen')}
      />
    </ScrollView>
  );
};

export default HomeScreen;
