import { ScrollView } from 'react-native';
import ReusableExampleComponent from '../components/ReusableExampleComponent';

const ChatScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Chat screen'} />
    </ScrollView>
  );
};

export default ChatScreen;
