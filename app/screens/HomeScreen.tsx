import {ScrollView, StyleSheet, Text} from "react-native";

const HomeScreen = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>
          Home Screen! Hi!!!!!!!!!!!!!!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
      paddingTop: 20,
      paddingBottom: 20,
  }
});

export default HomeScreen;