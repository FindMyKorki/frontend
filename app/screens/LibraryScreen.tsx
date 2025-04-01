import { ScrollView, StyleSheet, Text } from 'react-native';

const LibraryScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>Library Screen! Bye!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default LibraryScreen;
