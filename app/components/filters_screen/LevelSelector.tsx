import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Level } from '../../types/Level';

type Props = {
  levels: Level[];
  selectedLevelId?: number;
  onSelect: (id: number | undefined) => void;
};

const LevelSelector = ({ levels, selectedLevelId, onSelect }: Props) => {
  return (
    <>
      <Text className="mt-4 text-primary font-semibold text-sm mb-2">Poziom:</Text>
      <View className="flex-row flex-wrap gap-2 font-medium">
        {levels.map((level) => {
          const isSelected = selectedLevelId === level.id;
          return (
            <Pressable
              key={level.id}
              onPress={() => onSelect(level.id)}
              className={`flex flex-row items-center px-2.5 py-2 rounded border-2 ${
                isSelected ? 'bg-primary border-primary' : 'border-background-alt'
              }`}
            >
              {isSelected && (
                <MaterialIcons name="done" size={13} color="#FFFFFF" style={{ marginRight: 6 }} />
              )}
              <Text className={isSelected ? 'text-white' : 'text-black'}>{level.level}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default LevelSelector;
