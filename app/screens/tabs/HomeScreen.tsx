import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const HomeScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Home screen'} />
    </ScrollView>
  );
};

export default HomeScreen;
