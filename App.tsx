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
import DataList from "./components/DataList";

export default function App() {
  const [text, setText] = useState<string>("");
  const [flatListData, setFlatListData] = useState<Array<string>>([
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
  ]);

  const deleteCurrentElement = (idx: number) => {
    setFlatListData((prev) => prev.filter((e: string, i: number) => i != idx));
  };

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
          <Button
            onPress={() =>
              setFlatListData((prev) => [
                ...prev,
                new Date().getSeconds().toString(),
              ])
            }
            title="This is a button"
          />
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
      <DataList
        flatListData={flatListData}
        deleteCurrentElement={deleteCurrentElement}
      />
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
