import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppButton from '../AppButton';

const NoFiltersView = ({ onNavigateToFilters }: { onNavigateToFilters: () => void }) => (
  <View className="flex-1 mt-10 py-5">
    <View className="bg-background-alt p-6 rounded-lg items-center">
      <MaterialIcons name="info" size={32} color="#424242" className="mb-3" />
      <Text className="text-lg font-medium text-text-light text-center mb-2">
        Wybierz filtry, aby znaleźć korepetytora
      </Text>
      <Text className="text-text-light text-center mb-4">
        Aby wyświetlić listę dostępnych korepetytorów, wybierz poszukiwany przedmiot oraz poziom
        nauczania.
      </Text>
      <AppButton onPress={onNavigateToFilters} label="Wybierz filtry" size="full" />
    </View>
  </View>
);

export default NoFiltersView;
