import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full mx-4 mt-4 mb-2 px-4 py-2">
      <Feather name="search" size={20} color="#888" />
      <TextInput
        placeholder="Wyszukaj konwersacje"
        placeholderTextColor="#888"
        editable={true}
        className="flex-1 ml-2 text-base text-text-dark"
      />
      <Pressable>
        <Feather name="x" size={20} color="#888" />
      </Pressable>
    </View>
  );
};

export default SearchBar;
