import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type FilterTagProps = {
  text: string;
  onRemove?: () => void;
};

function FilterTag({ text, onRemove }: FilterTagProps) {
  return (
    <View className="flex-row items-center  px-2.5 py-[5px] rounded bg-background-alt  gap-x-3 relative">
      <Text className="font-semibold">{text}</Text>
      {onRemove && (
        <Pressable onPress={onRemove}>
          <MaterialIcons name="close" size={16} color="black" />
        </Pressable>
      )}
    </View>
  );
}

export default FilterTag;
