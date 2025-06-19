import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';

const ClassDetailsScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'ClassDetails screen'} />
      <Button title={'Przejdź do ReportScreen'} onPress={() => nav.navigate('Report')} />
      <Button title={'Wróć do TabsScreen'} onPress={() => nav.navigate('Tabs')} />
      <Button title={'Przejdź do BookingScreen'} onPress={() => nav.navigate('BookingScreen')} />
    </ScrollView>
  );
};

export default ClassDetailsScreen;
