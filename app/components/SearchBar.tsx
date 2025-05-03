import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type SearchBarProps = {
  placeholder: string;
  onSearch: (query: string) => void;
  className?: string;
  debounceTime?: number;
};

const SearchBar = ({
  placeholder,
  onSearch,
  className = '',
  debounceTime = 300,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceTime, onSearch]);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <View className={`flex-row items-center text-sm bg-white text-text-medium ${className}`}>
      <View
        className={`flex-1 flex-row items-center rounded-lg border px-3 ${
          isFocused ? 'border-primary' : 'border-background-alt'
        } bg-background-alt`}
      >
        <MaterialIcons name="search" size={20} className="mr-2" />
        <TextInput
          className="flex-1 h-full"
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="done"
        />
        {searchQuery ? (
          <Pressable onPress={handleClear} className="p-1">
            <MaterialIcons name="close" size={20} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default SearchBar;
