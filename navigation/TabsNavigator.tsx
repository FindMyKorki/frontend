import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

export type TabsParamList = {
  Home: undefined;
  Library: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }} />
      <Tab.Screen name="Library"
                  component={LibraryScreen}
                  options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabBarStyle: {
    height: 58,
    paddingBottom: 5,
    paddingTop: 8,
    paddingHorizontal: 20,
    borderTopWidth: 0,
  },
});

export default TabsNavigator;