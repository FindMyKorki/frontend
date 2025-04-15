import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const ClassesListScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Classes list screen'} />
    </ScrollView>
  );
};

export default ClassesListScreen;
