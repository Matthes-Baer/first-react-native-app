import { View, Text, Button } from "react-native";
import { useLayoutEffect } from "react";

import type { StackParamList } from "../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<StackParamList, "SecondScreen">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions as having it as a prop for the screen component but can be used for non screen components. Helpful for receiving the route props, for example.
//? Therefore in this case it's irrelevant since this is a screen component.
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack"; // for useNavigation hook
import type { RouteProp } from "@react-navigation/native"; // for useRoute hook
import { StatusBar } from "expo-status-bar";

type SecondScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "SecondScreen"
>;

type SecondScreenRouteProp = RouteProp<StackParamList, "SecondScreen">;

export default function SecondScreen({ navigation, route }: Props) {
  const navigationHook = useNavigation<SecondScreenNavigationProp>();
  const routeHook = useRoute<SecondScreenRouteProp>();

  //? useLayoutEffect serves the purpose to simultaneously render the stuff in there (useEffect renders it after the component itself rendered which can cause ugly loading)
  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params?.testParam });
  }, []);

  return (
    <View>
      <Text>Second Screen Text</Text>
      <Button
        title="Go to Home Screen via navigate prop"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Go to Home Screen via useNavigation hook"
        onPress={() => navigationHook.navigate("Home")}
      />
      <Text>
        {route.params?.testParam} - This is data passed via initialParams OR via
        param from the navigation method (route object)
      </Text>
    </View>
  );
}
