import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';

const SortOptionsScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'SortOptionsScreen screen'} />
    </ScrollView>
  );
};

export default SortOptionsScreen;
