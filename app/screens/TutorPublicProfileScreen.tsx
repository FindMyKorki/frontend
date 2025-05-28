import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';

const TutorPublicProfileScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'TutorPublicProfileScreen'} />
    </ScrollView>
  );
};

export default TutorPublicProfileScreen;
