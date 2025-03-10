import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import {NavigationContainer} from "@react-navigation/native";
import TabsNavigator from "./navigation/TabsNavigator";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <>
          <StatusBar/>
          <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1}} testID={"App:SafeAreaView:AppContainer"}>
                  <NavigationContainer>
                      <Stack.Navigator>
                          <Stack.Screen name="Tabs" component={TabsNavigator} options={{headerShown: false}}/>
                      </Stack.Navigator>
                  </NavigationContainer>
              </SafeAreaView>
          </SafeAreaProvider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
