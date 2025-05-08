import { View, Text, TextInput } from 'react-native';

type Props = {
  minPrice: string;
  maxPrice: string;
  onChangeMin: (value: string) => void;
  onChangeMax: (value: string) => void;
};

const PriceSelector = ({ minPrice, maxPrice, onChangeMin, onChangeMax }: Props) => {
  return (
    <>
      <Text className="mt-4 text-primary font-semibold text-sm mb-2">Cena (za 60min):</Text>
      <View className="flex-row gap-2">
        <View className="flex flex-1 flex-row items-center px-3 py-2 rounded border-2 border-background-alt bg-white">
          <Text className="text-black  mr-1">Od</Text>
          <TextInput
            className="flex-1 p-0  h-5"
            placeholder="0"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={onChangeMin}
          />
          <Text className="text-black  ml-1">PLN</Text>
        </View>
        <View className="flex flex-1 flex-row items-center px-3 py-2 rounded border-2 border-background-alt bg-white">
          <Text className="text-black  mr-1">Do</Text>
          <TextInput
            className="flex-1 p-0  h-5"
            placeholder="0"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={onChangeMax}
          />
          <Text className="text-black ml-1">PLN</Text>
        </View>
      </View>
    </>
  );
};

export default PriceSelector;
