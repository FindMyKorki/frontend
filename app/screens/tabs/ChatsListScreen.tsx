import { ScrollView, Text } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';

const ChatsListScreen = () => {
  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Chats list screen'} />
    </ScrollView>
  );
};

export default ChatsListScreen;
