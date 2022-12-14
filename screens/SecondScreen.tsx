import { View, Text, Button } from "react-native";

import type { StackParamList } from "../utils/ReactNavigationTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<StackParamList, "SecondScreen">;

//! The useNavigation hook can be used when having to access the navigation method in a component that is not a screen component.
//! The useRoute hook provides the same functions having it as a prop for the screen component but can be used for non screen components.
//? Therefore in this case it's irrelevant since this is a screen component.
import { useNavigation, useRoute } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<StackParamList, "SecondScreen">,
  StackNavigationProp<StackParamList>
>;

export default function SecondScreen({ navigation, route }: Props) {
  const navigationHook = useNavigation<ProfileScreenNavigationProp>();
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
      <Text></Text>
    </View>
  );
}
