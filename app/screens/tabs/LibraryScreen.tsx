import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const ProfileScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Profile screen'} />
    </ScrollView>
  );
};

export default ProfileScreen;
