import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';

const FiltersScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Filters screen'} />
    </ScrollView>
  );
};

export default FiltersScreen;
