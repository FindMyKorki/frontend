import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const EditProfileScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'EditProfileScreen screen'} />
    </ScrollView>
  );
};

export default EditProfileScreen;
