import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const EditOfferScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'EditOfferScreen screen'} />
    </ScrollView>
  );
};

export default EditOfferScreen;
