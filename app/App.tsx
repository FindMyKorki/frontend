import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './navigation/TabsNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaProvider testID={'App:SafeAreaProvider:AppContainer'}>
        <SafeAreaView className={`flex-1 bg-white justify-center align-center`}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Tabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
