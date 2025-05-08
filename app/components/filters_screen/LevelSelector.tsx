import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  levelOptions: string[];
  selectedLevel: string | null;
  selectLevel: (level: string) => void;
};

const LevelSelector = ({ levelOptions, selectedLevel, selectLevel }: Props) => {
  return (
    <>
      <Text className="mt-4 text-primary font-semibold text-sm mb-2">Poziom:</Text>
      <View className="flex-row flex-wrap gap-2 font-medium">
        {levelOptions.map((level) => {
          const isSelected = selectedLevel === level;
          return (
            <Pressable
              key={level}
              onPress={() => selectLevel(level)}
              className={`flex flex-row items-center px-2.5 py-2 rounded border-2 ${
                isSelected ? 'bg-primary border-primary' : 'border-background-alt'
              }`}
            >
              {isSelected && (
                <MaterialIcons name="done" size={13} color="#FFFFFF" className="mr-2" />
              )}
              <Text className={isSelected ? 'text-white' : 'text-black'}>{level}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default LevelSelector;
