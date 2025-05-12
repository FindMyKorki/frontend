import { View, Text, Pressable } from 'react-native';
import React, { useState, FC } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalAtButton from './ModalAtButton';

type SortDropdownProps = {
  options: string[];
  onSelect?: (option: string) => void;
};

const SortDropdown: FC<SortDropdownProps> = ({ options, onSelect = () => {} }) => {
  const [selected, setSelected] = useState(options[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const button = (
    <Pressable className="flex-row items-center px-3 py-2 bg-background-alt rounded-md gap-x-3 relative">
      <Text className="font-semibold">{selected}</Text>
      <MaterialIcons name="edit" size={16} color="black" />
    </Pressable>
  );

  return (
    <View className="flex-row flex-wrap items-center gap-x-3">
      <Text className="text-primary font-semibold">Sortowanie:</Text>

      <ModalAtButton
        spaceBetween={4}
        button={button}
        visible={modalVisible}
        setVisible={setModalVisible}
      >
        <View className="py-4 px-5 gap-y-2">
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => {
                onSelect(option);
                setModalVisible(false);
                setSelected(option);
              }}
            >
              <Text className="text-text-light">{option}</Text>
            </Pressable>
          ))}
        </View>
      </ModalAtButton>
    </View>
  );
};

export default SortDropdown;
