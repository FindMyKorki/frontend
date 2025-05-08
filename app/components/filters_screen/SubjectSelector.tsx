import { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../SearchBar';

type Props = {
  subjectOptions: string[];
  recommendedSubjects: string[];
  selectedSubject?: string;
  selectSubject: (subject: string) => void;
};

const SubjectSelector = ({
  subjectOptions,
  recommendedSubjects,
  selectedSubject,
  selectSubject,
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState<string[]>(recommendedSubjects);

  const filteredSubjects = useMemo(() => {
    if (!searchText) return [];
    return subjectOptions.filter((subject) =>
      subject.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, subjectOptions]);

  const handleSelect = (subject: string) => {
    if (!tags.includes(subject)) {
      setTags((prev) => [...prev, subject]);
    }

    selectSubject(subject);
    setSearchText('');
  };

  return (
    <View className="mb-4">
      <Text className="mt-4 text-primary font-semibold text-sm mb-2">Przedmiot:</Text>

      <SearchBar
        placeholderValue="Szukaj przedmiotu..."
        onSearch={setSearchText}
        value={searchText}
      />

      {searchText ? (
        <ScrollView className="max-h-60 mt-2">
          {filteredSubjects.map((item) => (
            <TouchableOpacity
              key={item}
              className="py-2 px-3 bg-background-alt rounded mb-1"
              onPress={() => handleSelect(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap gap-2 mt-3 font-medium">
          {tags.map((subject) => {
            const isSelected = selectedSubject === subject;
            return (
              <Pressable
                key={subject}
                className={`flex flex-row items-center px-2.5 py-2 rounded border-2 ${
                  isSelected ? 'bg-primary border-primary' : 'border-background-alt'
                }`}
                onPress={() => handleSelect(subject)}
              >
                {isSelected && (
                  <MaterialIcons name="done" size={13} color="#FFFFFF" className="mr-2" />
                )}
                <Text className={isSelected ? 'text-white' : 'text-black'}>{subject}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SubjectSelector;
