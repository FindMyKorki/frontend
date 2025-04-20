import { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface TutorDescriptionProps {
  title?: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}

const TutorDescription: FC<TutorDescriptionProps> = ({ title = 'opis', description, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    color: '#1A5100',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  description: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter',
  },
});

export default TutorDescription;
