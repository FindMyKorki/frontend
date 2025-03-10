import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";

export type TabsParamList = {
  Home: undefined;
  Library: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;