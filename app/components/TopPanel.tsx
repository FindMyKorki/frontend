import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ModalAtButton from './ModalAtButton';
import { useNavigation } from '@react-navigation/native';

export type TopPanelProps = {
  onBackPress?: void;
  showSettings?: boolean;
  name?: string;
  image?: string;
  className?: string;
  centerContentClassName?: string;
};

const TopPanel = ({
  onBackPress = undefined,
  showSettings = false,
  name,
  image,
  className = '',
  centerContentClassName = '',
}: TopPanelProps) => {
  const nav = useNavigation();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const settingsOptions = ['PROFIL', 'Edytuj', 'Regulamin', 'Zgłoś problem', 'Wyloguj'];

  const handleOptionPress = (option: string) => {
    if (option === settingsOptions[0]) {
    } else if (option === settingsOptions[1]) {
      nav.navigate('EditProfile' as never);
    } else if (option === settingsOptions[2]) {
    } else if (option === settingsOptions[3]) {
    } else if (option === settingsOptions[4]) {
    }
    console.log('Wybrano opcję:', option);
  };

  const settingsButton = (
    <Pressable className="p-1">
      <MaterialIcons name="more-vert" size={24} color="black" />
    </Pressable>
  );

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-2.5 bg-background ${className}`}
    >
      {/* Back button */}
      <Pressable onPress={onBackPress} className="p-1">
        <MaterialIcons name="arrow-back" size={24} color={onBackPress ? 'black' : 'transparent'} />
      </Pressable>

      {/* Center: avatar and name */}
      {(name || image) && (
        <View className={`flex-1 flex-row items-center ${centerContentClassName}`}>
          {image && (
            <Image source={{ uri: image }} className="w-10 h-10 rounded-full" resizeMode="cover" />
          )}
          {name && (
            <Text className={`ml-2 font-semibold text-base text-text-dark ${!image && 'ml-0'}`}>
              {name}
            </Text>
          )}
        </View>
      )}

      {/* Settings dropdown */}
      {showSettings && (
        <ModalAtButton
          spaceBetween={4}
          button={settingsButton}
          visible={dropdownVisible}
          setVisible={setDropdownVisible}
        >
          <View className="py-4 px-5 gap-y-2">
            {settingsOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  setDropdownVisible(false);
                  handleOptionPress(option);
                }}
              >
                <Text className="text-text-dark text-right">{option}</Text>
              </Pressable>
            ))}
          </View>
        </ModalAtButton>
      )}
    </View>
  );
};

export default TopPanel;
