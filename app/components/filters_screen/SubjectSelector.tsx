import { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../SearchBar';
import { Subject } from '../../types/Subject';

type Props = {
  subjects: Subject[];
  recommendedSubjects: Subject[];
  selectedSubjectId?: number;
  selectSubject: (subjectId: number) => void;
};

const SubjectSelector = ({
  subjects,
  recommendedSubjects,
  selectedSubjectId,
  selectSubject,
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState<Subject[]>(recommendedSubjects);

  const filteredSubjects = useMemo(() => {
    if (!searchText) return [];
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, subjects]);

  const handleSelect = (subject: Subject) => {
    if (!tags.some((s) => s.id === subject.id)) {
      setTags((prev) => [...prev, subject]);
    }

    selectSubject(subject.id);
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
              key={item.id}
              className="py-2 px-3 bg-background-alt rounded mb-1"
              onPress={() => handleSelect(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap gap-2 mt-3 font-medium">
          {tags.map((subject) => {
            const isSelected = selectedSubjectId === subject.id;
            return (
              <Pressable
                key={subject.id}
                className={`flex flex-row items-center px-2.5 py-2 rounded border-2 ${
                  isSelected ? 'bg-primary border-primary' : 'border-background-alt'
                }`}
                onPress={() => handleSelect(subject)}
              >
                {isSelected && (
                  <MaterialIcons name="done" size={13} color="#FFFFFF" style={{ marginRight: 6 }} />
                )}
                <Text className={isSelected ? 'text-white' : 'text-black'}>{subject.name}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SubjectSelector;
