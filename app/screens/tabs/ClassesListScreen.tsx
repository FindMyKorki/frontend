import { Button, ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';

const ClassesListScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Classes list screen'} />
      <Button
        title={'Przejdź do ClassDetailsScreen'}
        onPress={() => nav.navigate('ClassDetails')}
      />
    </ScrollView>
  );
};

export default ClassesListScreen;
