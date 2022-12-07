import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  const [text, setText] = useState<string>("Starting Text");
  const [flatListData, setFlatListData] = useState<Array<string>>([
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <Text style={{ flex: 1 }}>{text ? text : "placeholder..."}</Text>
        <View style={{ flex: 1 }}>
          <Button title="This is a button" />
        </View>
      </View>
      {/* <View style={{ height: 500 }}>
        <ScrollView>
          <Text style={styles.flexItem}>Test?</Text>
          <Text style={styles.textStyle}>
            There are UI-wise differences for android and iOS. Some elements
            don't support a border-radius for both android and iOS, for example.
            Therefore the View element should be used since this element
            supports such styling behavior for both platforms.
          </Text>
          <Text style={styles.textStyle}>
            In React Native child elements don't inherit the styling from its
            parents. Setting the font-color for a parent element doesn't also
            change the font-color for the respective child elements.
          </Text>
          <Text style={styles.textStyle}>
            Placeholder Text Placeholder Text Placeholder Text Placeholder Text
            Placeholder Text Placeholder Text
          </Text>
        </ScrollView>
      </View> */}
      <View style={{ height: 500 }}>
        <FlatList
          data={flatListData}
          renderItem={(itemData) => {
            return (
              <View>
                <Text style={{ fontSize: 45 }}>{itemData.item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            // should just be implemented in the state (item) which would be structured as an object with "key" - then this function would not be needed.
            // Or use "id", for example and return that in this function.
            const keyValue = `${Math.random().toString()}&${index}`;
            return keyValue;
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 50,
  },
  flexItem: {
    padding: 25,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    padding: 25,
    borderWidth: 2,
    borderColor: "red",
    marginBottom: 10,
  },
});
