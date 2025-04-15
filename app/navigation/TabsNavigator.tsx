import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatsListScreen from '../screens/tabs/ChatsListScreen';
import ClassesListScreen from '../screens/tabs/ClassesListScreen';
import { Colors } from '../../src/colors';

export type TabsParamList = {
  Home: undefined;
  ChatsList: undefined;
  ClassesList: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === 'ChatsList') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'ClassesList') {
            iconName = focused ? 'calendar-text' : 'calendar-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Pulpit' }} />
      <Tab.Screen name="ChatsList" component={ChatsListScreen} options={{ tabBarLabel: 'Czat' }} />
      <Tab.Screen
        name="ClassesList"
        component={ClassesListScreen}
        options={{ tabBarLabel: 'Zajęcia' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
