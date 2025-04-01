import {ScrollView, Text} from "react-native";
import ReusableExampleComponent from "../components/ReusableExampleComponent";

const HomeScreen = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ReusableExampleComponent exampleProp={'Hi!'} />
      <Text className={`px-def-hor`}>
          Home Screen! Hi
      </Text>
    </ScrollView>
  );
}

export default HomeScreen;