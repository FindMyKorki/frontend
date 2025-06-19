import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type SearchBarProps = {
  placeholderValue: string;
  onSearch: (query: string) => void;
  value: string;
  className?: string;
};

const SearchBar = ({ placeholderValue, onSearch, value, className = '' }: SearchBarProps) => {
  const handleClear = () => {
    onSearch('');
  };

  return (
    <View className={`flex-row text-sm rounded-lg bg-background-alt ${className}`}>
      <View
        className={`flex-1 flex-row items-center rounded-lg border px-3 border-background-alt bg-background-alt`}
      >
        <MaterialIcons name="search" size={20} className="mr-2" />
        <TextInput
          className="flex-1"
          placeholder={placeholderValue}
          value={value}
          onChangeText={onSearch}
          returnKeyType="done"
        />
        {value ? (
          <Pressable onPress={handleClear} className="p-1">
            <MaterialIcons name="close" size={20} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default SearchBar;
