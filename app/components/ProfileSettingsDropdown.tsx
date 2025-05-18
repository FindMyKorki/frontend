import React from 'react';
import { View, Text, Pressable } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

type ProfileSettingsDropdownProps = {
  options: string[];
  onSelect?: (option: string) => void;
  onClose: () => void;
};

const ProfileSettingsDropdown: React.FC<ProfileSettingsDropdownProps> = ({
  options,
  onSelect = () => {},
  onClose,
}) => {
  return (
    <View className="absolute top-full right-0 mt-def-y bg-background border border-border-gray rounded-lg w-56 z-50 py-def-y px-def-x">
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => {
            onSelect(option);
            onClose();
          }}
          className="py-3 px-4"
        >
          <Text className="text-text-dark text-right">{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ProfileSettingsDropdown;
