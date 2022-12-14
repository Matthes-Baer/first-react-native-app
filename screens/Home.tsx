import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground, // access to implement an image -> https://reactnative.dev/docs/imagebackground
  Alert, // access to .alert -> https://reactnative.dev/docs/alert
  SafeAreaView, // provides a View that respects the top part of different phones where you can't place any content -> https://reactnative.dev/docs/safeareaview
  Dimensions, // with this one can access the screen/window size of the current device, for example (in iOS screen/width is identical, for android window is excluding the status bar)
  useWindowDimensions, // This hook serves a similar purpose as the Dimensions API but can be used within a component so it get's rerendered when the user switches the device orientation without restarting the app.
  KeyboardAvoidingView, // This helps to leave an input field in iOS where not possibility would be given if the keyboard blocks the screen.
  Platform, // with Platform.OS one can point to android or iOS for platform-specific styles, for example. The select method offers a similar purpose
} from "react-native";
import DataList from "../components/DataList";

// @ts-expect-error
// In this case a android- and iOS-specific file for Modal was created but only the normal Modal component has to be implemented.
// Under the hood react native serves the android file to android devices and the iOS file to ios devices.
import Modal from "../components/Modal";

//! https://docs.expo.dev/guides/using-custom-fonts/
//! The following 4 lines are reqzured to properly introduce a custom hook to the application.
//! The custom fonts can be used throughout the whole application.
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

//? React Navigation TypeScript stuff
import type { StackParamList } from "../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<StackParamList, "Home">;

export default function Home({ navigation }: Props) {
  //! The prop comes from the React navigation and the fact that this component is considered a screen component

  const { width, height } = useWindowDimensions();

  const marginTop = height < 400 ? 10 : 50;
  const padding = width < 380 ? 12 : 25;

  const [text, setText] = useState<string>("");
  const [flatListData, setFlatListData] = useState<Array<string>>([
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
    "This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text. This is a placeholder Text.",
  ]);

  const deleteCurrentElement = (idx: number) => {
    setFlatListData((prev) => prev.filter((e: string, i: number) => i != idx));
  };

  //! The following lines are used to load the custom font and show a loading screen while the font is not yet loaded.
  //! The implemented font can be used throughout the whole application.
  const [fontsLoaded] = useFonts({
    "Press-Start": require("../assets/fonts/PressStart2P-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={[styles.container, { marginTop: marginTop }]}
      onLayout={onLayoutRootView}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          keyboardType="decimal-pad"
        />
        <Text style={{ flex: 1, fontFamily: "Press-Start" }}>
          {text ? text : "placeholder..."}
        </Text>
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
          <Text style={[styles.flexItem, {padding: padding}]}>Test?</Text>
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
      <Modal />
      <Button
        title="Go to SecondScreen"
        onPress={() =>
          navigation.navigate("SecondScreen", {
            testParam: "Test123",
          })
        }
      />
      <StatusBar // with the style one can adjust the color for the status bar (adjusting to dark or light background)
        style="auto"
      />
    </View>
  );
}
//! Using the Dimensions API - This won't be calculated again if the user switches the devices orientation without restarting the app, for example.
// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  flexItem: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: Platform.select({ ios: 1, android: 2 }),
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
