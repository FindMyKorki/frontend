import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../src/colors';
import { View } from 'react-native';
import { ChatsListScreen, ClassesListScreen, HomeScreen, ProfileScreen } from '../index';

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

          return (
            <View className={'flex-1 w-[100%] items-center justify-center'}>
              <View className={`${focused ? 'bg-primary' : 'bg-white'} w-full h-1 pb-0.5`} />
              <MaterialCommunityIcons
                className={'pt-1'}
                name={iconName}
                size={size}
                color={color}
              />
            </View>
          );
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
        tabBarStyle: { paddingBottom: 5, height: 50 },
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
