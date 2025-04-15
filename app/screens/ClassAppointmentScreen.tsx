import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';

const ClassAppointmentScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'ClassAppointment screen'} />
      <Button
        title={'Przejdź do ClassDetailsScreen'}
        onPress={() => nav.navigate('ClassDetails')}
      />
    </ScrollView>
  );
};

export default ClassAppointmentScreen;
