import { Button, ScrollView, Text } from 'react-native';
import ReusableExampleComponent from '../../components/ReusableExampleComponent';
import { useNavigation } from '@react-navigation/native';

const ChatsListScreen = () => {
  const nav = useNavigation();

  const customFunction = () => {
    console.log('Hello World!');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Chats list screen'} />
      <Button title={'Przejdź do ChatScreen'} onPress={() => nav.navigate('Chat')} />
    </ScrollView>
  );
};

export default ChatsListScreen;
