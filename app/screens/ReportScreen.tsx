import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';

const ReportScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Report screen'} />
    </ScrollView>
  );
};

export default ReportScreen;
