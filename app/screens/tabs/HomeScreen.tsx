import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';

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
        title={'Przejdź do ProfileScreen (Tutor)'}
        onPress={() => nav.navigate('TutorProfile')}
      />
      <Button
        title={'Przejdź do TutorPublicProfile (Uczeń)'}
        onPress={() => nav.navigate('TutorPublicProfile')}
      />
      <Button title={'Przejdź do ReportScreen'} onPress={() => nav.navigate('Report')} />
    </ScrollView>
  );
};

export default HomeScreen;
