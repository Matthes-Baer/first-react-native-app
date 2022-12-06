import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [text, setText] = useState<string>("Starting Text");

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <Text>{text} + 1</Text>
        <Button title="This is a button" />
      </View>
      <Text style={styles.flexItem}>Test?</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  flexItem: {
    padding: 25,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
