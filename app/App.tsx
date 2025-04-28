import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './navigation/TabsNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ChatScreen,
  ClassAppointmentScreen,
  ClassDetailsScreen,
  EditOfferScreen,
  EditProfileScreen,
  FiltersScreen,
  ProfileScreen,
  ReportScreen,
  SearchScreen,
  SortOptionsScreen,
  UserDetailsScreen,
} from './index';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaProvider testID={'App:SafeAreaProvider:AppContainer'}>
        <SafeAreaView className={`flex-1 bg-white justify-center align-center`}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ navigationBarColor: 'white' }}>
              <Stack.Screen
                name="Tabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="Filters"
                component={FiltersScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SortOptions"
                component={SortOptionsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditOffer"
                component={EditOfferScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ClassAppointment"
                component={ClassAppointmentScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ClassDetails"
                component={ClassDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TutorProfile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Report"
                component={ReportScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
