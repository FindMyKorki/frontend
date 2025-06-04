import { registerRootComponent } from 'expo';

import App from './App';

export { default as ChatScreen } from './screens/ChatScreen';
export { default as ClassAppointmentScreen } from './screens/ClassAppointmentScreen';
export { default as ClassDetailsScreen } from './screens/ClassDetailsScreen';
export { default as FiltersScreen } from './screens/FiltersScreen';
export { default as ReportScreen } from './screens/ReportScreen';
export { default as SearchScreen } from './screens/SearchScreen';
export { default as SortOptionsScreen } from './screens/SortOptionsScreen';
export { default as UserDetailsScreen } from './screens/UserDetailsScreen';
export { default as TutorProfileScreen } from './screens/TutorProfileScreen';
export { default as CompleteProfileScreen } from './screens/CompleteProfileScreen';
export { default as ProfileEditAvailabilityScreen } from './screens/ProfileEditAvailabilityScreen';
export { default as EditAvailabilityScreen } from './screens/EditAvailabilityScreen';
export { default as AvailabilityRepetitionScreen } from './screens/AvailabilityRepetitionScreen';

export { default as LoginScreen } from './screens/auth/LoginScreen';
export { default as RoleScreen } from './screens/auth/RoleScreen';

export { default as EditOfferScreen } from './screens/profile/EditOfferScreen';
export { default as EditProfileScreen } from './screens/profile/EditProfileScreen';

export { default as ProfileScreen } from './screens/tabs/ProfileScreen';
export { default as HomeScreen } from './screens/tabs/HomeScreen';
export { default as ChatsListScreen } from './screens/tabs/ChatsListScreen';
export { default as ClassesListScreen } from './screens/tabs/ClassesListScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
