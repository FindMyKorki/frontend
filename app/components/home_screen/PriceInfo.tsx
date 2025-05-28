import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PriceInfo = () => (
  <View className="flex-row items-center justify-end gap-1 mt-2">
    <MaterialIcons name="info-outline" size={12} color="#1A5100" />
    <Text className="text-xs font-semibold text-primary">Cena za 60 min zajęć</Text>
  </View>
);

export default PriceInfo;
